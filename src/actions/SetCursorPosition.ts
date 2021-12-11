import { CursorPosition } from '../CursorPosition';
import { Editor } from '../Editor';
import { ReplayAction } from '../ReplayAction';

export class SetCursorPosition extends ReplayAction {
  type = 'SetCursorPosition';

  constructor(readonly position: CursorPosition) {
    super();
  }

  static from(object: any) {
    return new SetCursorPosition(CursorPosition.from(object.position));
  }

  toJson() {
    return {
      type: this.type,
      position: this.position.toJson(),
    };
  }

  async play(editor: Editor) {
    editor.position = this.position;
  }
}
