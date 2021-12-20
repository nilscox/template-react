import { CursorPosition } from '../CursorPosition';
import { InvalidActionError } from '../InvalidActionError';
import { MemoryEditor } from '../MemoryEditor';
import { ReplayAction } from '../ReplayAction';
import { ActionType, EraseCodeActionData } from '../types';

export class EraseCodeAction implements ReplayAction {
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
      type: ActionType.EraseCode,
      end: this.end.values,
    };
  }

  apply(editor: MemoryEditor): void {
    editor.eraseCode(this.end);
  }
}
