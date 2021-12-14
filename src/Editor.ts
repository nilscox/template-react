import { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

import { Position } from './Position';
import { Range } from './Range';
import { Scheduler } from './Scheduler';

export enum EditorType {
  text = 'text',
  diff = 'diff',
}

type ICodeEditor = editor.ICodeEditor;
type IDiffEditor = editor.IDiffEditor;

export class TextEditor {
  constructor(private editor: ICodeEditor, private scheduler: Scheduler) {}

  get value() {
    return this.editor.getValue();
  }

  set value(value: string) {
    this.editor.setValue(value);
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

  addPositionListener(listener: (position: Position) => void) {
    this.editor.onDidChangeCursorPosition((e) =>
      listener({
        line: e.position.lineNumber,
        column: e.position.column,
      }),
    );
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
        throw new Error(`current position ${this.position.toString()} is before ${until.toString()}`);
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

export class DiffEditor {
  constructor(private diffEditor: IDiffEditor, private monaco: Monaco) {}

  private setValues(before: string, after: string) {
    this.diffEditor.setModel({
      original: this.monaco.editor.createModel(before),
      modified: this.monaco.editor.createModel(after),
    });
  }

  get valueBefore() {
    return this.diffEditor.getModel()?.original.getValue() ?? '';
  }

  set valueBefore(value: string) {
    this.setValues(value, this.valueAfter);
  }

  get valueAfter() {
    return this.diffEditor.getModel()?.modified.getValue() ?? '';
  }

  set valueAfter(value: string) {
    this.setValues(this.valueBefore, value);
  }
}

export class Editors {
  private _textEditor!: TextEditor;
  private _diffEditor!: DiffEditor;

  constructor(private readonly scheduler: Scheduler) {}

  setTextEditor(editor: ICodeEditor) {
    this._textEditor = new TextEditor(editor, this.scheduler);
  }

  setDiffEditor(diffEditor: IDiffEditor, monaco: Monaco) {
    this._diffEditor = new DiffEditor(diffEditor, monaco);
  }

  get textEditor(): TextEditor {
    if (!this._textEditor) {
      throw new Error('Editors: textEditor is not set');
    }

    return this._textEditor;
  }

  get diffEditor(): DiffEditor {
    if (!this._diffEditor) {
      throw new Error('Editors: diffEditor is not set');
    }

    return this._diffEditor;
  }
}
