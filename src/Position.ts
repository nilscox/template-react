import { IPosition as MonacoIPosition, Position as MonacoPosition } from 'monaco-editor';

export class Position {
  constructor(readonly line: number, readonly column = 1) {}

  equals(other: Position) {
    return this.line === other.line && this.column === other.column;
  }

  isBefore(other: Position) {
    if (this.line === other.line) {
      return this.column < other.column;
    }

    return this.line < other.line;
  }

  isAfter(other: Position) {
    return !this.isBefore(other);
  }

  get values() {
    return [this.line, this.column];
  }

  toString() {
    return `[${this.values.join(', ')}]`;
  }

  static from(object: any) {
    return new Position(object.line, object.column);
  }

  toJson() {
    return {
      line: this.line,
      column: this.column,
    };
  }

  static fromMonaco(position: MonacoPosition) {
    return new Position(position.lineNumber, position.column);
  }

  toMonaco(): MonacoIPosition {
    return {
      lineNumber: this.line,
      column: this.column,
    };
  }
}
