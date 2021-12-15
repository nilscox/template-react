import { draftToAction, InvalidDraftActionError } from '../draftActionMap';
import { selectDraftAction } from '../slices/editor.selectors';
import { updateDraftAction as updateDraftActionAction } from '../slices/editor.slice';
import { selectCurrentAction } from '../slices/replay.selectors';
import { replaceAction } from '../slices/replay.slice';
import { ThunkAction } from '../store';

import { playAction } from './playActions';

export const updateDraftAction = (path: string, value: string): ThunkAction => {
  return async (dispatch, getState, { editors }) => {
    dispatch(updateDraftActionAction({ path, value }));

    const action = selectCurrentAction(getState());
    const draftAction = selectDraftAction(getState());

    if (!draftAction) {
      return;
    }

    try {
      const newAction = draftToAction(draftAction);

      editors.textEditor.value = action.codeBefore;
      await dispatch(playAction(newAction));

      dispatch(replaceAction({ id: action.id, action: { ...action, ...newAction } }));
    } catch (error) {
      if (error instanceof InvalidDraftActionError) {
        return;
      }

      throw error;
    }
  };
};
