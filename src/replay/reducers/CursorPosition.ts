import { CursorPosition as CursorPositionProps } from '../replay.slice';

export class CursorPosition {
  constructor(private line: number, private column: number) {}

  get values(): CursorPositionProps {
    return [this.line, this.column];
  }

  set(line: number, column: number) {
    this.line = line;
    this.column = column;
  }
}
