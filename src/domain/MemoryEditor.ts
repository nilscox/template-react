import { CursorPosition } from './CursorPosition';

export class MemoryEditor {
  lines: string[] = [''];
  position = new CursorPosition(1, 1);

  get code(): string {
    return this.lines.join('\n');
  }

  insertLines(lines: number) {
    this.lines.splice(this.position.line, 0, ...Array<string>(lines).fill(''));
    this.position.line += lines;
    this.position.column = 1;
  }

  insertLinesBelow(lines: number) {
    this.lines.splice(this.position.line - 1, 0, ...Array<string>(lines).fill(''));
    this.position.column = 1;
  }

  insertCode(code: string) {
    const { line, column } = this.position;

    const lineBefore = this.lines[line - 1].slice(0, column - 1);
    const lineAfter = this.lines[line - 1].slice(column - 1);

    // prettier-ignore
    this.lines = [
      ...this.lines.slice(0, line - 1),
      [lineBefore, code, lineAfter].join(''),
      ...this.lines.slice(line),
    ].join('\n').split('\n');
  }
}
