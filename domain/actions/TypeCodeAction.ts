import { CursorPosition } from '../CursorPosition';
import { InvalidActionError } from '../InvalidActionError';
import { MemoryEditor } from '../MemoryEditor';
import { TypeCodeActionData } from '../Replay';
import { ReplayAction } from '../ReplayAction';

export class TypeCodeAction implements ReplayAction {
  readonly type = 'TypeCode';

  public prepare = {
    insertLinesAbove: 0,
    insertLinesBelow: 0,
  };

  constructor(private position: CursorPosition, private code: string) {
    if (!this.position.isValid()) {
      throw new InvalidActionError(this);
    }
  }

  static create(position: [number, number], code: string, prepare?: Partial<TypeCodeAction['prepare']>) {
    const action = new TypeCodeAction(CursorPosition.create(position), code);

    action.prepare.insertLinesAbove = prepare?.insertLinesAbove ?? 0;
    action.prepare.insertLinesBelow = prepare?.insertLinesBelow ?? 0;

    if (action.prepare.insertLinesAbove < 0 || action.prepare.insertLinesAbove < 0) {
      throw new InvalidActionError(action);
    }

    return action;
  }

  get data(): TypeCodeActionData {
    const data: TypeCodeActionData = {
      type: this.type,
      code: this.code,
      position: this.position.values,
    };

    if (this.prepare.insertLinesAbove > 0) {
      data.prepare = {
        insertLinesAbove: this.prepare.insertLinesAbove,
      };
    }

    if (this.prepare.insertLinesBelow > 0) {
      data.prepare = {
        ...data.prepare,
        insertLinesBelow: this.prepare.insertLinesBelow,
      };
    }

    return data;
  }

  apply(editor: MemoryEditor): void {
    editor.position = this.position.clone();

    if (this.prepare.insertLinesAbove > 0) {
      editor.insertLinesAbove(this.prepare.insertLinesAbove);
    }

    if (this.prepare.insertLinesBelow > 0) {
      editor.insertLinesBelow(this.prepare.insertLinesBelow);
    }

    editor.insertCode(this.code);
  }
}
