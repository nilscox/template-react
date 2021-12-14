import { setDraftAction } from '../slices/editor.slice';
import { selectAction, selectCurrentAction, selectReplay } from '../slices/replay.selectors';
import { setCurrentActionIndex } from '../slices/replay.slice';
import { ThunkAction } from '../store';
import { DraftPosition, Position } from '../types/entities';

export const setCurrentAction = (actionId: string): ThunkAction => {
  return (dispatch, getState, { editors }) => {
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

    editors.diffEditor.valueBefore = action.codeBefore;
    editors.diffEditor.valueAfter = action.codeAfter;

    editors.textEditor.value = action.codeBefore;
    editors.textEditor.focus();

    if (action.type === 'TypeCode') {
      editors.textEditor.position = action.position;

      dispatch(
        setDraftAction({
          position: draftPosition(action.position),
          code: action.code,
          prepare: {
            insertLinesAbove: String(action.prepare.insertLinesAbove ?? 0),
            insertLinesBelow: String(action.prepare.insertLinesBelow ?? 0),
          },
        }),
      );
    }

    if (action.type === 'EraseCode') {
      editors.textEditor.position = action.end;

      dispatch(
        setDraftAction({
          start: draftPosition(action.start),
          end: draftPosition(action.end),
        }),
      );
    }
  };
};

const draftPosition = (position: Position): DraftPosition => ({
  line: String(position.line),
  column: String(position.column),
});
