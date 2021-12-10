import { editor } from 'monaco-editor';

import { ReplayAction } from '../ReplayAction';

export class DeleteSelection extends ReplayAction {
  private constructor() {
    super();
  }

  static create() {
    return new DeleteSelection();
  }

  async playForward(editor: editor.IEditor) {
    editor.trigger('keyboard', 'deleteLeft', {});

    const position = editor.getPosition();

    if (position) {
      editor.setPosition(position);
    }
  }
}
