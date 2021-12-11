import { CursorPosition } from '../CursorPosition';
import { Editor } from '../Editor';
import { ReplayAction } from '../ReplayAction';

export class EraseCode extends ReplayAction {
  type = 'EraseCode';

  constructor(readonly start: CursorPosition, readonly end: CursorPosition) {
    super();
  }

  static from(object: any) {
    return new EraseCode(CursorPosition.from(object.start), CursorPosition.from(object.end));
  }

  toJson() {
    return {
      type: this.type,
      start: this.start.toJson(),
      end: this.end.toJson(),
    };
  }

  async play(editor: Editor) {
    editor.position = this.end;
    await this.wait('afterCursorMovement');

    await editor.erase(this.start);
  }
}
