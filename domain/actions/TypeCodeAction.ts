import { MemoryEditor } from '../MemoryEditor';
import { ReplayAction } from '../ReplayAction';
import { ActionType, TypeCodeActionData } from '../types';

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
