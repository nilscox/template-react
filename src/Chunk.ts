import { CursorPosition } from './Replay';

export interface Chunk {
  readonly initialCursorPosition: CursorPosition;
  readonly finalCursorPosition: CursorPosition;

  apply(code: string): string;
}

const getCursorPosition = (position: number | CursorPosition) => {
  if (typeof position === 'number') {
    return [position, 1];
  }

  return position;
};

export class ChunkRemoval implements Chunk {
  private constructor(
    readonly startLine: number,
    readonly startColumn: number,
    readonly endLine: number,
    readonly endColumn: number,
  ) {}

  static create(start: number | CursorPosition, end: number | CursorPosition) {
    const [startLine, startColumn] = getCursorPosition(start);
    const [endLine, endColumn] = getCursorPosition(end);

    if (startLine > endLine || (startLine === endLine && startColumn >= endColumn)) {
      const startStr = `[${startLine}, ${startColumn}]`;
      const endStr = `[${endLine}, ${endColumn}]`;

      throw new Error(`ChunkRemoval.create: start ${startStr} should be before end ${endStr}`);
    }

    return new ChunkRemoval(startLine - 1, startColumn - 1, endLine - 1, endColumn - 1);
  }

  get initialCursorPosition(): CursorPosition {
    return [this.endLine + 1, this.endColumn + 1];
  }

  get finalCursorPosition(): CursorPosition {
    return [this.startLine + 1, this.startColumn + 1];
  }

  apply(code: string) {
    const lines = code.split('\n');

    const lineBefore = lines[this.startLine].slice(0, this.startColumn);
    const lineAfter = lines[this.endLine].slice(this.endColumn);

    // prettier-ignore
    return [
      ...lines.slice(0, this.startLine),
      [lineBefore, lineAfter].join(''),
      ...lines.slice(this.endLine + 1),
    ].join('\n');
  }
}

export class ChunkAddition implements Chunk {
  private constructor(readonly code: string, readonly line: number, readonly column: number) {}

  static create(position: number | CursorPosition, code: string) {
    if (code === '') {
      throw new Error('ChunkAddition.create: code should not be empty');
    }

    const [line, column] = getCursorPosition(position);

    return new ChunkAddition(code, line - 1, column - 1);
  }

  get initialCursorPosition(): CursorPosition {
    return [this.line + 1, this.column + 1];
  }

  get finalCursorPosition(): CursorPosition {
    const lines = this.code.split('\n');

    if (lines.length === 1) {
      return [this.line + 1, this.column + 1 + this.code.length];
    }

    return [this.line + lines.length, lines[lines.length - 1].length];
  }

  apply(code: string) {
    const lines = code.split('\n');

    const lineBefore = lines[this.line].slice(0, this.column);
    const lineAfter = lines[this.line].slice(this.column);

    return [
      ...lines.slice(0, this.line),
      [lineBefore, this.code, lineAfter].join(''),
      ...lines.slice(this.line + 1),
    ].join('\n');
  }
}
