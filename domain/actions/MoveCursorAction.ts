import { CursorPosition } from '../CursorPosition';
import { InvalidActionError } from '../InvalidActionError';
import { MemoryEditor } from '../MemoryEditor';
import { MoveCursorActionData, PositionData, ReplayAction } from '../Replay';

export class MoveCursorAction implements ReplayAction {
  readonly type = 'MoveCursor';

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
      type: this.type,
      position: this.position.values,
    };
  }

  apply(editor: MemoryEditor): void {
    editor.position = this.position.clone();
  }
}
