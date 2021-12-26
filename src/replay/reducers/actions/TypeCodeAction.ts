import { TypeCodeAction as TypeCodeProps } from '../../replay.slice';
import { MemoryEditor } from '../MemoryEditor';
import { ActionType, ReplayAction } from '../ReplayAction';

export class TypeCodeAction implements ReplayAction {
  static create(code = '') {
    return new TypeCodeAction({ type: ActionType.TypeCode, code });
  }

  constructor(public props: TypeCodeProps) {}

  apply(editor: MemoryEditor): void {
    editor.code = this.props.code;
    editor.position.set(1, this.props.code.length + 1);
  }
}
