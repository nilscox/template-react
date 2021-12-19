import { CursorPosition } from '../CursorPosition';
import { InvalidActionError } from '../InvalidActionError';
import { MemoryEditor } from '../MemoryEditor';
import { EraseCodeActionData, ReplayAction } from '../Replay';

export class EraseCodeAction implements ReplayAction {
  readonly type = 'EraseCode';

  constructor(private end: CursorPosition) {
    if (!this.end.isValid()) {
      throw new InvalidActionError(this);
    }
  }

  static create(end: [number, number]) {
    return new EraseCodeAction(CursorPosition.create(end));
  }

  get data(): EraseCodeActionData {
    return {
      type: this.type,
      end: this.end.values,
    };
  }

  apply(editor: MemoryEditor): void {
    editor.eraseCode(this.end);
  }
}
