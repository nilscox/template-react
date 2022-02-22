import { CursorPosition as CursorPositionProps } from '../replay.slice';

export class CursorPosition {
  constructor(public line: number, public column: number) {}

  get values(): CursorPositionProps {
    return [this.line, this.column];
  }

  clone() {
    return new CursorPosition(this.line, this.column);
  }

  set(line: number, column: number) {
    this.line = line;
    this.column = column;
  }
}
