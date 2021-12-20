import { CursorPosition } from '../CursorPosition';
import { InvalidActionError } from '../InvalidActionError';
import { MemoryEditor } from '../MemoryEditor';
import { ActionType, MoveCursorActionData, PositionData, ReplayAction } from '../Replay';

export class MoveCursorAction implements ReplayAction {
  constructor(private position: CursorPosition) {
    if (!this.position.isValid()) {
      throw new InvalidActionError(this);
    }
  }

  static create(position: PositionData) {
    return new MoveCursorAction(CursorPosition.create(position));
  }

  get data(): MoveCursorActionData {
    return {
      type: ActionType.MoveCursor,
      position: this.position.values,
    };
  }

  apply(editor: MemoryEditor): void {
    editor.position = this.position.clone();
  }
}
