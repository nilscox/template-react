import { selectCurrentAction, selectReplay } from '../slices/replay.selectors';
import { setCurrentActionIndex } from '../slices/replay.slice';
import { ThunkAction } from '../store';

export const nextAction = (): ThunkAction => {
  return (dispatch, getState, { editors }) => {
    const replay = selectReplay(getState());

    dispatch(setCurrentActionIndex(replay.currentActionIndex + 1));

    const currentAction = selectCurrentAction(getState());

    editors.textEditor.value = currentAction.codeAfter;
  };
};
