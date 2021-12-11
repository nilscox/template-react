import { Editor } from '../Editor';
import { ReplayAction } from '../ReplayAction';

export class DeleteSelection extends ReplayAction {
  type = 'DeleteSelection';
  typeSpeed?: number;

  constructor() {
    super();
  }

  async play(editor: Editor) {
    editor.backspace();
    editor.clearMultiCursor();
  }
}
