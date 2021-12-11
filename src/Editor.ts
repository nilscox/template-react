import { editor } from 'monaco-editor';

import { CursorPosition } from './CursorPosition';
import { Range } from './Replay';
import { TimeManager } from './TimeManager';

export class Editor {
  constructor(private readonly editor: editor.ICodeEditor, private readonly time: TimeManager) {}

  private transformRange([start, end]: Range) {
    return {
      positionLineNumber: start.line,
      positionColumn: start.column,
      selectionStartLineNumber: end.line,
      selectionStartColumn: end.column,
    };
  }

  get value() {
    return this.editor.getValue();
  }

  get position(): CursorPosition {
    const position = this.editor.getPosition()!;

    return new CursorPosition(position.lineNumber, position.column);
  }

  set position(position: CursorPosition) {
    const [lineNumber, column] = position.values;

    this.editor.setPosition({
      lineNumber,
      column,
    });
  }

  set selection(range: Range) {
    this.editor.setSelection(this.transformRange(range));
  }

  set selections(ranges: Range[]) {
    this.editor.setSelections(ranges.map(this.transformRange));
  }

  clearMultiCursor() {
    const position = this.editor.getPosition();

    if (position) {
      this.editor.setPosition(position);
    }
  }

  getRange(start: CursorPosition, end: CursorPosition) {
    const allLines = this.value.split('\n');
    const lines = allLines.slice(start.line - 1, end.line);

    if (start.line === end.line) {
      return lines[0].substring(start.column - 1, end.column - 1);
    }

    const firstLine = lines[0].substring(start.column - 1);
    const lastLine = lines[lines.length - 1].substring(0, end.column - 1);

    return [firstLine, ...lines.slice(1, lines.length - 1), lastLine].join('\n');
  }

  backspace() {
    this.trigger('keyboard', 'deleteLeft');
  }

  insert(code: string) {
    this.trigger('keyboard', 'type', { text: code });
  }

  async type(code: string) {
    for (const char of code) {
      this.trigger('keyboard', 'type', { text: char });
      await this.time.wait('betweenCharacters');
    }
  }

  async erase(until: CursorPosition) {
    while (!this.position.equals(until)) {
      if (this.position.isBefore(until)) {
        throw new Error(`current position ${this.position.toString()} is before ${until}`);
      }

      this.backspace();
      await this.time.wait('betweenCharacters');
    }
  }

  async insertLinesBeforeCursor(lines: number) {
    for (let i = 0; i < lines; ++i) {
      this.trigger('keyboard', 'editor.action.insertLineAfter');
      await this.time.wait('betweenCharacters');
    }
  }

  async insertLinesAfterCursor(lines: number) {
    for (let i = 0; i < lines; ++i) {
      this.trigger('keyboard', 'editor.action.insertLineBefore');
      await this.time.wait('betweenCharacters');
    }
  }

  trigger(source: string, handlerId: string, payload: unknown = {}) {
    this.editor.trigger(source, handlerId, payload);
  }
}
