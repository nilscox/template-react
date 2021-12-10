import { editor } from 'monaco-editor';

import { getCursorPosition } from '../Chunk';
import { CursorPosition } from '../Replay';
import { ReplayAction } from '../ReplayAction';

export class InsertLinesAbove extends ReplayAction {
  type = 'InsertLinesAbove';

  private constructor(readonly position: CursorPosition, readonly lines: number) {
    super();
  }

  static create(position: CursorPosition, lines: number) {
    return new InsertLinesAbove(position, lines);
  }

  async playForward(editor: editor.IEditor) {
    const [line, column] = getCursorPosition(this.position);

    editor.setPosition({ lineNumber: line, column });
    await this.wait(500);

    for (let i = 0; i < this.lines; ++i) {
      editor.trigger('keyboard', 'editor.action.insertLineBefore', {});
      await this.wait(12);
    }
  }

  apply(code: string): string {
    return Array(this.lines).fill('\n').join('') + code;
  }
}
