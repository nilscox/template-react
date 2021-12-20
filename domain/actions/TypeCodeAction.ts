import { MemoryEditor } from '../MemoryEditor';
import { ActionType, ReplayAction, TypeCodeActionData } from '../Replay';

export class TypeCodeAction implements ReplayAction {
  constructor(private code: string) {}

  static create(code: string) {
    return new TypeCodeAction(code);
  }

  get data(): TypeCodeActionData {
    return {
      type: ActionType.TypeCode,
      code: this.code,
    };
  }

  apply(editor: MemoryEditor): void {
    editor.insertCode(this.code);
  }
}
