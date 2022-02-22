import { tryUpdateStepAction } from '../../../store/slices/replay.slice';
import { ThunkAction } from '../../../store/store';
import { selectDraftStep } from '../editor.selectors';
import { DraftAction, updateDraftStep } from '../editor.slice';

export enum ActionField {
  moveCursorLine,
  moveCursorColumn,
  insertLinesAbove,
  insertLinesBelow,
  typeCodeCode,
  eraseCodeEndLine,
  eraseCodeEndColumn,
}

const mapFieldToPath = (field: ActionField) => {
  switch (field) {
    case ActionField.moveCursorLine:
    case ActionField.eraseCodeEndLine:
      return 'line';

    case ActionField.moveCursorColumn:
    case ActionField.eraseCodeEndColumn:
      return 'column';

    case ActionField.insertLinesAbove:
      return 'above';

    case ActionField.insertLinesBelow:
      return 'below';

    case ActionField.typeCodeCode:
      return 'code';
  }
};

export const updateDraftAction = (action: DraftAction, field: ActionField, value: string): ThunkAction => {
  return (dispatch, getState) => {
    const draftStep = selectDraftStep(getState());

    if (!draftStep) {
      return;
    }

    const actionIndex = draftStep.actions.indexOf(action);

    dispatch(updateDraftStep({ path: `actions.${actionIndex}.${mapFieldToPath(field)}`, value }));
    dispatch(tryUpdateStepAction({ actionIndex, field, value }));
  };
};
