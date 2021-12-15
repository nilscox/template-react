export class CursorPosition {
  constructor(public line: number, public column = 1) {}

  clone(): CursorPosition {
    return new CursorPosition(this.line, this.column);
  }

  toDraft(): DraftPosition {
    return {
      line: String(this.line),
      column: String(this.column),
    };
  }

  static fromDraft(draft: DraftPosition) {
    return new CursorPosition(Number(draft.line), Number(draft.column));
  }

  isValid() {
    return Number.isInteger(this.line) && this.line >= 1 && Number.isInteger(this.column) && this.column >= 1;
  }

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

  toJSON() {
    return {
      line: this.line,
      column: this.column,
    };
  }

  toString() {
    return `[${this.values.join(', ')}]`;
  }
}

export type DraftPosition = {
  line: string;
  column: string;
};
