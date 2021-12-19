import { MemoryEditor } from '../MemoryEditor';
import { ReplayAction, TypeCodeActionData } from '../Replay';

export class TypeCodeAction implements ReplayAction {
  readonly type = 'TypeCode';

  constructor(private code: string) {}

  static create(code: string) {
    return new TypeCodeAction(code);
  }

  get data(): TypeCodeActionData {
    return {
      type: this.type,
      code: this.code,
    };
  }

  apply(editor: MemoryEditor): void {
    editor.insertCode(this.code);
  }
}
