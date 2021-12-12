import { editor } from 'monaco-editor';

import { Scheduler } from './domain/Scheduler';
import { Position } from './Position';
import { Range } from './Range';

export class Editor {
  constructor(private readonly editor: editor.ICodeEditor, private readonly scheduler: Scheduler) {}

  get value() {
    return this.editor.getValue();
  }

  get position(): Position {
    return Position.fromMonaco(this.editor.getPosition()!);
  }

  set position(position: Position) {
    this.editor.setPosition(Position.from(position).toMonaco());
  }

  set selection(range: Range) {
    this.editor.setSelection(range.toMonaco());
  }

  set selections(ranges: Range[]) {
    this.editor.setSelections(ranges.map((range) => range.toMonaco()));
  }

  focus() {
    console.log(this.editor);
    this.editor.focus();
  }

  clear() {
    return this.editor.setValue('');
  }

  clearMultiCursor() {
    const position = this.editor.getPosition();

    if (position) {
      this.editor.setPosition(position);
    }
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
      await this.scheduler.wait('betweenCharacters');
    }
  }

  async erase(until: Position) {
    while (!this.position.equals(until)) {
      if (this.position.isBefore(until)) {
        throw new Error(`current position ${this.position.toString()} is before ${until}`);
      }

      this.backspace();
      await this.scheduler.wait('betweenCharacters');
    }
  }

  async insertLinesAbove(lines: number) {
    for (let i = 0; i < lines; ++i) {
      this.trigger('keyboard', 'editor.action.insertLineAfter');
      await this.scheduler.wait('betweenCharacters');
    }
  }

  async insertLinesBelow(lines: number) {
    for (let i = 0; i < lines; ++i) {
      this.trigger('keyboard', 'editor.action.insertLineBefore');
      await this.scheduler.wait('betweenCharacters');
    }
  }

  trigger(source: string, handlerId: string, payload: unknown = {}) {
    this.editor.trigger(source, handlerId, payload);
  }
}
