import { CursorPosition } from '../CursorPosition';
import { Editor } from '../Editor';
import { ReplayAction } from '../ReplayAction';

export class InsertLines extends ReplayAction {
  type = 'InsertLines';

  linesBefore: number;
  linesAfter: number;

  constructor(readonly position: CursorPosition, where: { linesBefore?: number; linesAfter?: number }) {
    super();

    this.linesBefore = where.linesBefore ?? 0;
    this.linesAfter = where.linesAfter ?? 0;
  }

  static from(object: any) {
    return new InsertLines(object.position, object);
  }

  toJson() {
    return {
      type: this.type,
      position: this.position.toJson(),
      linesAfter: this.linesAfter,
      linesBefore: this.linesBefore,
    };
  }

  async play(editor: Editor) {
    editor.position = this.position;
    await this.wait('afterCursorMovement');

    for (let i = 0; i < this.linesBefore; ++i) {
      await editor.insertLinesBeforeCursor(1);
    }

    for (let i = 0; i < this.linesAfter; ++i) {
      await editor.insertLinesAfterCursor(1);
    }
  }
}
