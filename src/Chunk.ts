import { CursorPosition } from './Replay';

export interface Chunk {
  readonly initialCursorPosition: CursorPosition;
  readonly finalCursorPosition: CursorPosition;

  apply(code: string): string;
}

export const getCursorPosition = (position: CursorPosition) => {
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

  static create(start: CursorPosition, end: CursorPosition) {
    const [startLine, startColumn] = getCursorPosition(start);
    const [endLine, endColumn] = getCursorPosition(end);

    if (startLine > endLine || (startLine === endLine && startColumn >= endColumn)) {
      const startStr = `[${startLine}, ${startColumn}]`;
      const endStr = `[${endLine}, ${endColumn}]`;

      throw new Error(`ChunkRemoval.create: start ${startStr} should be before end ${endStr}`);
    }

    return new ChunkRemoval(startLine, startColumn, endLine, endColumn);
  }

  get initialCursorPosition(): CursorPosition {
    return [this.endLine, this.endColumn];
  }

  get finalCursorPosition(): CursorPosition {
    return [this.startLine, this.startColumn];
  }

  apply(code: string) {
    const lines = code.split('\n');

    const lineBefore = lines[this.startLine - 1].slice(0, this.startColumn - 1);
    const lineAfter = lines[this.endLine - 1].slice(this.endColumn - 1);

    // prettier-ignore
    return [
      ...lines.slice(0, this.startLine - 1),
      [lineBefore, lineAfter].join(''),
      ...lines.slice(this.endLine),
    ].join('\n');
  }
}

export class ChunkAddition implements Chunk {
  private constructor(readonly code: string, readonly line: number, readonly column: number) {}

  static create(position: CursorPosition, code: string) {
    if (code === '') {
      throw new Error('ChunkAddition.create: code should not be empty');
    }

    const [line, column] = getCursorPosition(position);

    return new ChunkAddition(code, line, column);
  }

  static from(object: any) {
    return new ChunkAddition(object.code, object.line, object.column);
  }

  get initialCursorPosition(): CursorPosition {
    return [this.line, this.column];
  }

  get finalCursorPosition(): CursorPosition {
    const lines = this.code.split('\n');

    if (lines.length === 1) {
      return [this.line, this.column + this.code.length];
    }

    return [this.line - 1 + lines.length, lines[lines.length - 1].length];
  }

  apply(code: string) {
    const lines = code.split('\n');

    const lineBefore = lines[this.line - 1].slice(0, this.column - 1);
    const lineAfter = lines[this.line - 1].slice(this.column - 1);

    return [
      ...lines.slice(0, this.line - 1),
      [lineBefore, this.code, lineAfter].join(''),
      ...lines.slice(this.line),
    ].join('\n');
  }
}
