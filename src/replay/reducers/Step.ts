import { ReplayAction as ReplayActionProps, Step as StepProps } from '../replay.slice';

import { TypeCodeAction } from './actions/TypeCodeAction';
import { MemoryEditor } from './MemoryEditor';
import { ReplayAction } from './ReplayAction';

export class Step {
  static create(overrides: Partial<StepProps> = {}) {
    return new Step({
      name: 'step',
      actions: [],
      initialState: { code: '', position: [1, 1] },
      finalState: { code: '', position: [1, 1] },
      ...overrides,
    });
  }

  private actions: ReplayAction[];

  constructor(public props: StepProps) {
    this.actions = props.actions.map(Step.instantiateAction);
  }

  static instantiateAction(props: ReplayActionProps): ReplayAction {
    switch (props.type) {
      case 'TypeCode':
        return new TypeCodeAction(props);
    }
  }

  insertAction(index: number, actionProps: ReplayActionProps) {
    const action = Step.instantiateAction(actionProps);

    this.actions.splice(index, 0, action);
    this.props.actions.splice(index, 0, action.props);
  }

  apply(editor: MemoryEditor) {
    this.props.initialState.code = editor.code;
    this.props.initialState.position = editor.position.values;

    for (const action of this.actions) {
      action.apply(editor);
    }

    this.props.finalState.code = editor.code;
    this.props.finalState.position = editor.position.values;
  }
}
