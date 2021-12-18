import { CursorPosition } from '../CursorPosition';
import { InvalidActionError } from '../InvalidActionError';
import { MemoryEditor } from '../MemoryEditor';
import { EraseCodeActionData } from '../Replay';
import { ReplayAction } from '../ReplayAction';

export class EraseCodeAction implements ReplayAction {
  readonly type = 'EraseCode';

  constructor(private start: CursorPosition, private end: CursorPosition) {
    if (!this.start.isValid() || !this.end.isValid() || this.start.isAfter(this.end)) {
      throw new InvalidActionError(this);
    }
  }

  static create(start: [number, number], end: [number, number]) {
    return new EraseCodeAction(CursorPosition.create(start), CursorPosition.create(end));
  }

  get data(): EraseCodeActionData {
    return {
      type: this.type,
      start: this.start.values,
      end: this.end.values,
    };
  }

  apply(editor: MemoryEditor): void {
    editor.position = this.end.clone();
    editor.eraseCode(this.start);
  }
}
