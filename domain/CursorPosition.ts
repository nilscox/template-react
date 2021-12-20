import { PositionData } from './types';

export class CursorPosition {
  constructor(public line = 1, public column = 1) {}

  static create([line, column]: PositionData) {
    return new CursorPosition(line, column);
  }

  set([line, column]: PositionData) {
    this.line = line;
    this.column = column;
  }

  clone(): CursorPosition {
    return new CursorPosition(this.line, this.column);
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

  get values(): PositionData {
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
