import { selectCurrentAction, selectReplay } from '../slices/replay.selectors';
import { ThunkAction } from '../store';

import { playAction } from './playActions';
import { setCurrentAction } from './setCurrentAction';

export const playCurrentAction = (): ThunkAction<Promise<void>> => {
  return async (dispatch, getState) => {
    const replay = selectReplay(getState());
    const currentAction = selectCurrentAction(getState());
    const currentActionIndex = replay.currentActionIndex;

    if (currentActionIndex === replay.actions.length) {
      return;
    }

    await dispatch(playAction(currentAction));

    dispatch(setCurrentAction(replay.actions[currentActionIndex + 1]));
  };
};
