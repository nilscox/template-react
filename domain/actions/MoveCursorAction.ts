import { CursorPosition } from '../CursorPosition';
import { InvalidActionError } from '../InvalidActionError';
import { MemoryEditor } from '../MemoryEditor';
import { ReplayAction } from '../ReplayAction';
import { ActionType, MoveCursorActionData, PositionData } from '../types';

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
