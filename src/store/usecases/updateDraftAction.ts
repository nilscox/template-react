import { InvalidActionError } from '../../domain/InvalidActionError';
import { selectDraftAction } from '../slices/editor.selectors';
import { updateDraftAction as updateDraftActionAction } from '../slices/editor.slice';
import { selectCurrentAction } from '../slices/replay.selectors';
import { ThunkAction } from '../store';

export const updateDraftAction = (path: string, value: string): ThunkAction => {
  return (dispatch, getState) => {
    dispatch(updateDraftActionAction({ path, value }));

    const action = selectCurrentAction(getState());
    const draftAction = selectDraftAction(getState());

    if (!draftAction) {
      return;
    }

    try {
      // todo
    } catch (error) {
      if (error instanceof InvalidActionError) {
        return;
      }

      throw error;
    }
  };
};
