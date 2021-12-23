import { EraseCodeAction } from './actions/EraseCodeAction';
import { InsertLinesAction } from './actions/InsertLinesAction';
import { MoveCursorAction } from './actions/MoveCursorAction';
import { TypeCodeAction } from './actions/TypeCodeAction';
import { MemoryEditor } from './MemoryEditor';
import { ReplayAction } from './ReplayAction';
import { ActionType, EditorState, PlayedStepData, ReplayActionData } from './types';

const defaultState: EditorState = {
  code: '',
  position: [1, 1],
};

export class ReplayStep {
  public initialState = defaultState;
  public finalState = defaultState;

  public actions: ReplayAction[];

  constructor(private props: PlayedStepData) {
    this.actions = props.actions.map(ReplayStep.createAction);
  }

  static create(props: PlayedStepData): ReplayStep {
    const step = new ReplayStep(props);

    if ('initialState' in props) {
      step.initialState = props.initialState;
      step.finalState = props.finalState;
    }

    return step;
  }

  private static createAction(action: ReplayActionData): ReplayAction {
    switch (action.type) {
      case ActionType.MoveCursor:
        return MoveCursorAction.create(action.position);

      case ActionType.InsertLines:
        return InsertLinesAction.create(action);

      case ActionType.TypeCode:
        return TypeCodeAction.create(action.code);

      case ActionType.EraseCode:
        return EraseCodeAction.create(action.end);
    }
  }

  get data(): PlayedStepData {
    return this.props;
  }

  apply(editor: MemoryEditor) {
    this.props.initialState = {
      code: editor.code,
      position: editor.position.values,
    };

    for (const action of this.actions) {
      action.apply(editor);
    }

    this.props.finalState = {
      code: editor.code,
      position: editor.position.values,
    };
  }
}
