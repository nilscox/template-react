import { CursorPosition } from '../CursorPosition';
import { Editor } from '../Editor';
import { ReplayAction } from '../ReplayAction';

export class SetCursorPosition extends ReplayAction {
  type = 'SetCursorPosition';

  constructor(readonly position: CursorPosition) {
    super();
  }

  async play(editor: Editor) {
    editor.position = this.position;
  }
}
