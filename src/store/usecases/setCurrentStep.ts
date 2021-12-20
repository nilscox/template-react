import { PlayedStepData, PositionData, ReplayActionData, ReplayStepData } from '../../../domain/Replay';
import { DraftAction, DraftPosition, DraftStep, setDraftStep } from '../slices/editor.slice';
import { selectReplay } from '../slices/replay.selectors';
import { setCurrentStepIndex } from '../slices/replay.slice';
import { ThunkAction } from '../store';

export const setCurrentStep = (step: PlayedStepData | undefined): ThunkAction => {
  return (dispatch, getState, { editors }) => {
    if (!step) {
      dispatch(setDraftStep(undefined));
      return;
    }

    const replay = selectReplay(getState());
    const index = replay.steps.indexOf(step);

    if (index < 0) {
      throw new Error('setCurrentStep: step not found');
    }

    dispatch(setCurrentStepIndex(index));
    dispatch(setDraftStep(draft.transformStepToDraft(step)));

    editors.diffEditor.valueBefore = step.initialState.code;
    editors.diffEditor.valueAfter = step.finalState.code;

    editors.textEditor.value = step.initialState.code;
    editors.textEditor.position = step.initialState.position;
  };
};

export const draft = {
  transformStepToDraft(step: ReplayStepData): DraftStep {
    return {
      actions: step.actions.map(draft.transformActionToDraft),
    };
  },
  transformStepFromDraft(name: string, step: DraftStep): ReplayStepData {
    return {
      name,
      actions: step.actions.map(draft.transformActionFromDraft),
    };
  },
  transformActionToDraft(action: ReplayActionData): DraftAction {
    const positionToDraft = ([line, column]: PositionData): DraftPosition => {
      return {
        line: String(line),
        column: String(column),
      };
    };

    switch (action.type) {
      case 'MoveCursor':
        return {
          type: 'MoveCursor',
          position: positionToDraft(action.position),
        };

      case 'InsertLines':
        return {
          type: 'InsertLines',
          above: String(action.above),
          below: String(action.below),
        };

      case 'TypeCode':
        return {
          type: 'TypeCode',
          code: action.code,
        };

      case 'EraseCode':
        return {
          type: 'EraseCode',
          end: positionToDraft(action.end),
        };
    }
  },
  transformActionFromDraft(draft: DraftAction): ReplayActionData {
    const positionFromDraft = ({ line, column }: DraftPosition): PositionData => {
      return [Number(line), Number(column)];
    };

    switch (draft.type) {
      case 'MoveCursor':
        return {
          type: 'MoveCursor',
          position: positionFromDraft(draft.position),
        };

      case 'InsertLines':
        return {
          type: 'InsertLines',
          above: Number(draft.above),
          below: Number(draft.below),
        };

      case 'TypeCode':
        return {
          type: 'TypeCode',
          code: draft.code,
        };

      case 'EraseCode':
        return {
          type: 'EraseCode',
          end: positionFromDraft(draft.end),
        };
    }
  },
  createDraftAction(type: ReplayActionData['type']): DraftAction {
    switch (type) {
      case 'MoveCursor':
        return { type: 'MoveCursor', position: { line: '1', column: '1' } };

      case 'InsertLines':
        return { type: 'InsertLines', above: '0', below: '0' };

      case 'TypeCode':
        return { type: 'TypeCode', code: '' };

      case 'EraseCode':
        return { type: 'EraseCode', end: { line: '1', column: '1' } };
    }
  },
};
