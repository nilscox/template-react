import { Editor } from '../Editor';
import { ReplayAction } from '../ReplayAction';

export class DeleteSelection extends ReplayAction {
  type = 'DeleteSelection';
  typeSpeed?: number;

  static from(_object: any) {
    return new DeleteSelection();
  }

  toJson() {
    return {
      type: this.type,
    };
  }

  async play(editor: Editor) {
    editor.backspace();
    editor.clearMultiCursor();
  }
}
