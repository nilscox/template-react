import { setDraftAction } from '../slices/editor.slice';
import { selectAction, selectCurrentAction, selectReplay } from '../slices/replay.selectors';
import { setCurrentActionIndex } from '../slices/replay.slice';
import { ThunkAction } from '../store';

import { instantiateAction } from './loadReplay';

export const setCurrentAction = (actionId: string): ThunkAction => {
  return (dispatch, getState, { editors }) => {
    const replay = selectReplay(getState());
    const currentAction = selectCurrentAction(getState());
    const action = selectAction(getState(), actionId);

    if (!action) {
      console.warn(`action with id "${actionId}" not found`);
      return;
    }

    const index = replay.actions.indexOf(action);

    if (actionId !== currentAction.id) {
      dispatch(setCurrentActionIndex(index));
    }

    editors.diffEditor.valueBefore = action.codeBefore;
    editors.diffEditor.valueAfter = action.codeAfter;

    editors.textEditor.value = action.codeBefore;
    editors.textEditor.focus();

    if (action.type === 'TypeCode') {
      editors.textEditor.position = action.position;
    }

    if (action.type === 'EraseCode') {
      editors.textEditor.position = action.end;
    }

    dispatch(setDraftAction(instantiateAction(action).toDraft()));
  };
};
