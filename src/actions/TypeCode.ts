import { CursorPosition } from '../CursorPosition';
import { Editor } from '../Editor';
import { ReplayAction } from '../ReplayAction';

type PrepareTypeCode = {
  insertLinesBefore?: number;
  insertLinesAfter?: number;
};

export class TypeCode extends ReplayAction {
  type = 'TypeCode';

  constructor(readonly position: CursorPosition, readonly code: string, readonly prepare: PrepareTypeCode = {}) {
    super();
  }

  static from(object: any) {
    return new TypeCode(object.position, object.code);
  }

  async play(editor: Editor) {
    editor.position = this.position;
    await this.wait('afterCursorMovement');

    await editor.insertLinesBeforeCursor(this.prepare.insertLinesBefore ?? 0);
    await editor.insertLinesAfterCursor(this.prepare.insertLinesAfter ?? 0);

    if (this.time?.immediate) {
      editor.insert(this.code);
    } else {
      await editor.type(this.code);
    }
  }
}
