export class CursorPosition {
  constructor(readonly line: number, readonly column = 1) {}

  equals(other: CursorPosition) {
    return this.line === other.line && this.column === other.column;
  }

  isBefore(other: CursorPosition) {
    if (this.line === other.line) {
      return this.column < other.column;
    }

    return this.line < other.line;
  }

  isAfter(other: CursorPosition) {
    return !this.isBefore(other);
  }

  get values() {
    return [this.line, this.column];
  }

  toString() {
    return `[${this.values.join(', ')}]`;
  }
}
