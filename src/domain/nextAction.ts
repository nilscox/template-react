import { selectIsEditorReady } from './editor.selectors';
import { playActions } from './playActions';
import { selectCurrentAction, selectReplay } from './replay.selectors';
import { setCurrentActionIndex } from './replay.slice';
import { ThunkAction } from './store';

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
