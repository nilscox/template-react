import { IPosition as MonacoIPosition, Position as MonacoPosition } from 'monaco-editor';

export class Position {
  line: number;
  column: number;

  constructor(line: number, column = 1) {
    this.line = line;
    this.column = column;
  }

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

  static from(object: { line: number; column: number }) {
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
