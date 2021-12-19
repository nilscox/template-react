import { selectCurrentInitialPosition } from '../slices/replay.selectors';
import { ThunkAction } from '../store';

export const moveCursorToInitialPosition = (): ThunkAction => {
  return (_dispatch, getState, { editors }) => {
    const initialPosition = selectCurrentInitialPosition(getState());

    if (initialPosition) {
      editors.textEditor.position = initialPosition;
    }

    editors.textEditor.focus();
  };
};
