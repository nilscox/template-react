import { editor } from 'monaco-editor';

import { Range } from '../Replay';
import { ReplayAction } from '../ReplayAction';

export class AddSelections extends ReplayAction {
  type = 'AddSelections';

  private constructor(readonly selections: Range[]) {
    super();
  }

  static create(selections: Range[]) {
    return new AddSelections(selections);
  }

  async playForward(editor: editor.IEditor) {
    const editorPositions = this.selections.map(([start, end]) => ({
      positionLineNumber: start[0],
      positionColumn: start[1],
      selectionStartLineNumber: end[0],
      selectionStartColumn: end[1],
    }));

    editor.setSelections(editorPositions);
  }
}
