import { Editor } from '../Editor';
import { Range } from '../Replay';
import { ReplayAction } from '../ReplayAction';

export class AddSelections extends ReplayAction {
  type = 'AddSelections';

  constructor(readonly ranges: Range[]) {
    super();
  }

  async play(editor: Editor) {
    editor.selections = this.ranges;
  }
}
