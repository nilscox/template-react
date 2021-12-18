import { CursorPosition } from './CursorPosition';

export class MemoryEditor {
  lines: string[] = [''];
  position = new CursorPosition();

  get code(): string {
    return this.lines.join('\n');
  }

  set code(code: string) {
    this.lines = code.split('\n');
  }

  get currentLine() {
    return this.lines[this.position.line - 1];
  }

  get firstLine() {
    return this.lines[0];
  }

  get lastLine() {
    return this.lines[this.lines.length - 1];
  }

  get lastPosition() {
    return new CursorPosition(this.lines.length, this.lastLine.length + 1);
  }

  get linesBeforeCursor() {
    return this.linesBeforePosition(this.position);
  }

  get linesAfterCursor() {
    return this.linesAfterPosition(this.position);
  }

  get codeBeforeCursor() {
    return this.codeBeforePosition(this.position);
  }

  get codeAfterCursor() {
    return this.codeAfterPosition(this.position);
  }

  linesBeforePosition(position: CursorPosition) {
    return this.lines.slice(0, position.line - 1);
  }

  linesAfterPosition(position: CursorPosition) {
    return this.lines.slice(position.line);
  }

  codeBeforePosition(position: CursorPosition) {
    if (position.line === 1) {
      return [this.firstLine.slice(0, position.column - 1)];
    }

    return [...this.linesBeforeCursor, this.currentLine.slice(0, position.column - 1)];
  }

  codeAfterPosition(position: CursorPosition) {
    if (position.line === this.lines.length) {
      return [this.lastLine.slice(position.column - 1)];
    }

    return [this.currentLine.slice(position.column - 1), ...this.linesAfterCursor];
  }

  insertLinesAbove(lines: number) {
    this.lines = [
      ...this.linesBeforeCursor,
      this.currentLine,
      ...Array<string>(lines).fill(''),
      ...this.linesAfterCursor,
    ];

    this.position.line += lines;
    this.position.column = 1;
  }

  insertLinesBelow(lines: number) {
    this.lines = [
      ...this.linesBeforeCursor,
      ...Array<string>(lines).fill(''),
      this.currentLine,
      ...this.linesAfterCursor,
    ];

    this.position.column = 1;
  }

  insertCode(code: string) {
    const codeAfterCursor = this.codeAfterCursor.join('\n');

    this.code = this.codeBeforeCursor.join('\n') + code;
    this.position = this.lastPosition;

    this.code += codeAfterCursor;
  }

  eraseCode(until: CursorPosition) {
    this.code = this.codeBeforePosition(until).join('\n') + this.codeAfterPosition(this.position).join('\n');
    this.position = until.clone();
  }
}
