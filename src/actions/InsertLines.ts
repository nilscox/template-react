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

  async play(editor: Editor) {
    editor.position = this.position;
    await this.wait('afterCursorMovement');

    for (let i = 0; i < this.linesBefore; ++i) {
      editor.insertLinesBeforeCursor();
      await this.wait('betweenCharacters');
    }

    for (let i = 0; i < this.linesAfter; ++i) {
      editor.insertLinesAfterCursor();
      await this.wait('betweenCharacters');
    }
  }
}
