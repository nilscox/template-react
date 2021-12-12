import { selectIsEditorReady } from '../slices/editor.selectors';
import { selectCurrentAction, selectReplay } from '../slices/replay.selectors';
import { setCurrentActionIndex } from '../slices/replay.slice';
import { ThunkAction } from '../store';

import { playActions } from './playActions';

export const nextAction = (): ThunkAction<Promise<void>> => {
  return async (dispatch, getState) => {
    const editorReady = selectIsEditorReady(getState());

    if (!editorReady) {
      throw new Error('replay/playTo: editor is not ready');
    }

    const replay = selectReplay(getState());
    const action = selectCurrentAction(getState());

    dispatch(setCurrentActionIndex(replay.currentActionIndex + 1));

    await dispatch(playActions([action]));
  };
};
