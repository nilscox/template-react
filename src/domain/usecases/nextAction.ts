import { selectCurrentAction, selectReplay } from '../slices/replay.selectors';
import { setCurrentActionIndex } from '../slices/replay.slice';
import { ThunkAction } from '../store';

export const nextAction = (): ThunkAction<Promise<void>> => {
  return async (dispatch, getState, { editor, scheduler }) => {
    const replay = selectReplay(getState());

    dispatch(setCurrentActionIndex(replay.currentActionIndex + 1));

    const currentAction = selectCurrentAction(getState());

    editor.value = currentAction.codeAfter;
  };
};
