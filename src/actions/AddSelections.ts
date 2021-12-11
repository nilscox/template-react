import { CursorPosition } from '../CursorPosition';
import { Editor } from '../Editor';
import { Range } from '../Replay';
import { ReplayAction } from '../ReplayAction';

export class AddSelections extends ReplayAction {
  type = 'AddSelections';

  constructor(readonly ranges: Range[]) {
    super();
  }

  static from(object: any) {
    return new AddSelections(
      object.ranges.map(([start, end]: any) => [CursorPosition.from(start), CursorPosition.from(end)]),
    );
  }

  toJson() {
    return {
      type: this.type,
      ranges: this.ranges.map(([start, end]) => [start.toJson(), end.toJson()]),
    };
  }

  async play(editor: Editor) {
    editor.selections = this.ranges;
  }
}
