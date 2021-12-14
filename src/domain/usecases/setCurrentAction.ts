import { selectIsEditorReady } from '../slices/editor.selectors';
import { selectAction, selectCurrentAction, selectReplay } from '../slices/replay.selectors';
import { setCurrentActionIndex } from '../slices/replay.slice';
import { ThunkAction } from '../store';

export const setCurrentAction = (actionId: string): ThunkAction => {
  return (dispatch, getState, { editor }) => {
    const editorReady = selectIsEditorReady(getState());

    if (!editorReady) {
      throw new Error('replay/playTo: editor is not ready');
    }

    const replay = selectReplay(getState());
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

    editor.value = action.codeAfter;
    editor.focus();
  };
};
