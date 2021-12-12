import { ISelection as MonacoISelection, Range as MonacoRange } from 'monaco-editor';

import { Position } from './Position';

export class Range {
  constructor(readonly start: Position, readonly end: Position) {}

  get values() {
    return [this.start.values, this.end.values];
  }

  toString() {
    return `[${this.values.join(', ')}]`;
  }

  static fromMonaco(range: MonacoRange) {
    return new Range(
      new Position(range.startLineNumber, range.startColumn),
      new Position(range.endLineNumber, range.endColumn),
    );
  }

  toMonaco(): MonacoISelection {
    return {
      selectionStartLineNumber: this.start.line,
      selectionStartColumn: this.start.column,
      positionLineNumber: this.end.line,
      positionColumn: this.end.column,
    };
  }
}
