import { selectIsEditorReady } from '../slices/editor.selectors';
import { selectAction, selectCurrentAction, selectReplay } from '../slices/replay.selectors';
import { setCurrentActionIndex } from '../slices/replay.slice';
import { ThunkAction } from '../store';

import { playActions } from './playActions';

export const setCurrentAction = (actionId: string): ThunkAction<Promise<void>> => {
  return async (dispatch, getState, { editor, scheduler }) => {
    const editorReady = selectIsEditorReady(getState());

    if (!editorReady) {
      throw new Error('replay/playTo: editor is not ready');
    }

    const replay = selectReplay(getState());
    const { currentActionIndex } = replay;
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

    editor.focus();
    scheduler.immediate = true;

    if (index < currentActionIndex) {
      editor.clear();
      await dispatch(playActions(replay.actions.slice(0, index)));
    }

    if (index > currentActionIndex) {
      await dispatch(playActions(replay.actions.slice(currentActionIndex, index)));
    }

    scheduler.immediate = false;
  };
};
