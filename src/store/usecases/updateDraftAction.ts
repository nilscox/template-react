import { InvalidActionError } from '../../../domain/InvalidActionError';
import { Replay, ReplayActionData } from '../../../domain/Replay';
import { selectDraftAction } from '../slices/editor.selectors';
import { updateDraftAction as updateDraftActionAction } from '../slices/editor.slice';
import { selectReplay } from '../slices/replay.selectors';
import { setActions } from '../slices/replay.slice';
import { ThunkAction } from '../store';

import { draft, setCurrentAction } from './setCurrentAction';

export const updateDraftAction = (path: string, value: string): ThunkAction => {
  return (dispatch, getState) => {
    dispatch(updateDraftActionAction({ path, value }));

    const replay = selectReplay(getState());
    const actions: ReplayActionData[] = replay.actions.slice();
    const draftAction = selectDraftAction(getState());

    if (!draftAction) {
      return;
    }

    actions[replay.currentActionIndex] = draft.transformFromDraft(draftAction);

    try {
      const playedActions = Replay.create(actions).play();

      dispatch(setActions(playedActions));
      dispatch(setCurrentAction(playedActions[replay.currentActionIndex]));
    } catch (error) {
      if (!(error instanceof InvalidActionError)) {
        throw error;
      }
    }
  };
};
