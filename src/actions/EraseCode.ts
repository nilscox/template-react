import { CursorPosition } from '../CursorPosition';
import { Editor } from '../Editor';
import { ReplayAction } from '../ReplayAction';

export class EraseCode extends ReplayAction {
  type = 'EraseCode';

  constructor(readonly start: CursorPosition, readonly end: CursorPosition) {
    super();
  }

  async play(editor: Editor) {
    editor.position = this.end;
    await this.wait('afterCursorMovement');

    await editor.erase(this.start);
  }
}
