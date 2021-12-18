import { selectCurrentInitialPosition } from '../slices/replay.selectors';
import { ThunkAction } from '../store';

export const moveCursorToInitialPosition = (): ThunkAction => {
  return (_dispatch, getState, { editors }) => {
    editors.textEditor.position = selectCurrentInitialPosition(getState());
  };
};
