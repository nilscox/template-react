import { InvalidActionError } from '../InvalidActionError';
import { MemoryEditor } from '../MemoryEditor';
import { ActionType, InsertLinesActionData, ReplayAction } from '../Replay';

export class InsertLinesAction implements ReplayAction {
  constructor(private above: number, private below: number) {
    if (above < 0 || below < 0) {
      throw new InvalidActionError(this);
    }
  }

  static create({ above = 0, below = 0 }: { above?: number; below?: number }) {
    return new InsertLinesAction(above, below);
  }

  get data(): InsertLinesActionData {
    return {
      type: ActionType.InsertLines,
      above: this.above,
      below: this.below,
    };
  }

  apply(editor: MemoryEditor): void {
    if (this.above > 0) {
      editor.insertLinesAbove(this.above);
    }

    if (this.below > 0) {
      editor.insertLinesBelow(this.below);
    }
  }
}
