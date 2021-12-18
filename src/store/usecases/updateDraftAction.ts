import { selectDraftAction } from '../slices/editor.selectors';
import { updateDraftAction as updateDraftActionAction } from '../slices/editor.slice';
import { selectCurrentAction } from '../slices/replay.selectors';
import { ThunkAction } from '../store';

import { updateCurrentAction } from './updateCurrentAction';

export const updateDraftAction = (path: string, value: string): ThunkAction => {
  return (dispatch, getState) => {
    dispatch(updateDraftActionAction({ path, value }));

    const action = selectCurrentAction(getState());
    const draftAction = selectDraftAction(getState());

    if (!draftAction) {
      return;
    }

    // if (!isDraftActionValid(draftAction)) {
    //   return;
    // }

    // dispatch(updateCurrentAction(actionFormDraft(draftAction)));
  };
};
