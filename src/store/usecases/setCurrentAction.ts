import { PlayedActionData, PositionData, ReplayActionData } from '../../../domain/Replay';
import { DraftAction, DraftPosition, setDraftAction } from '../slices/editor.slice';
import { selectReplay } from '../slices/replay.selectors';
import { setCurrentActionIndex } from '../slices/replay.slice';
import { ThunkAction } from '../store';

export const setCurrentAction = (action: PlayedActionData | undefined): ThunkAction => {
  return (dispatch, getState, { editors }) => {
    if (!action) {
      dispatch(setDraftAction(undefined));
      return;
    }

    const replay = selectReplay(getState());
    const index = replay.actions.indexOf(action);

    if (index < 0) {
      throw new Error('setCurrentAction: action not found');
    }

    dispatch(setCurrentActionIndex(index));
    dispatch(setDraftAction(draft.transformToDraft(action)));

    editors.diffEditor.valueBefore = action.initialCode;
    editors.diffEditor.valueAfter = action.finalCode;

    editors.textEditor.value = action.initialCode;
    editors.textEditor.position = action.initialPosition;

    // editors.textEditor.focus();
  };
};

export const draft = {
  transformToDraft(action: ReplayActionData): DraftAction {
    const positionToDraft = ([line, column]: PositionData): DraftPosition => {
      return {
        line: String(line),
        column: String(column),
      };
    };

    switch (action.type) {
      case 'TypeCode':
        return {
          type: 'TypeCode',
          position: positionToDraft(action.position),
          code: action.code,
          prepare: {
            insertLinesAbove: String(action.prepare?.insertLinesAbove ?? 0),
            insertLinesBelow: String(action.prepare?.insertLinesBelow ?? 0),
          },
        };

      case 'EraseCode':
        return {
          type: 'EraseCode',
          start: positionToDraft(action.start),
          end: positionToDraft(action.end),
        };
    }
  },
  transformFromDraft(draft: DraftAction): ReplayActionData {
    const positionFromDraft = ({ line, column }: DraftPosition): PositionData => {
      return [Number(line), Number(column)];
    };

    switch (draft.type) {
      case 'TypeCode':
        return {
          type: 'TypeCode',
          position: positionFromDraft(draft.position),
          code: draft.code,
          prepare: {
            insertLinesAbove: Number(draft.prepare.insertLinesAbove),
            insertLinesBelow: Number(draft.prepare.insertLinesBelow),
          },
        };

      case 'EraseCode':
        return {
          type: 'EraseCode',
          start: positionFromDraft(draft.start),
          end: positionFromDraft(draft.end),
        };
    }
  },
};
