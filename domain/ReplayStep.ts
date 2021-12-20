import { EraseCodeAction } from './actions/EraseCodeAction';
import { InsertLinesAction } from './actions/InsertLinesAction';
import { MoveCursorAction } from './actions/MoveCursorAction';
import { TypeCodeAction } from './actions/TypeCodeAction';
import { MemoryEditor } from './MemoryEditor';
import { ReplayAction } from './ReplayAction';
import { ActionType, EditorState, PlayedStepData, ReplayActionData, ReplayStepData } from './types';

export class ReplayStep {
  public initialState!: EditorState;
  public finalState!: EditorState;

  constructor(private name: string, private actions: ReplayAction[]) {}

  static create(step: ReplayStepData): ReplayStep {
    return new ReplayStep(step.name, step.actions.map(ReplayStep.createAction));
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
    return {
      name: this.name,
      initialState: this.initialState,
      finalState: this.finalState,
      actions: this.actions.map((action) => action.data),
    };
  }

  apply(editor: MemoryEditor) {
    for (const action of this.actions) {
      action.apply(editor);
    }
  }
}
