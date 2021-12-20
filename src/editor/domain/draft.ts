import { ActionType, PositionData, ReplayActionData, ReplayStepData } from '../../../domain/Replay';

import { DraftAction, DraftPosition, DraftStep } from './editor.slice';

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
      case ActionType.MoveCursor:
        return {
          type: ActionType.MoveCursor,
          position: positionToDraft(action.position),
        };

      case ActionType.InsertLines:
        return {
          type: ActionType.InsertLines,
          above: String(action.above),
          below: String(action.below),
        };

      case ActionType.TypeCode:
        return {
          type: ActionType.TypeCode,
          code: action.code,
        };

      case ActionType.EraseCode:
        return {
          type: ActionType.EraseCode,
          end: positionToDraft(action.end),
        };
    }
  },
  transformActionFromDraft(draft: DraftAction): ReplayActionData {
    const positionFromDraft = ({ line, column }: DraftPosition): PositionData => {
      return [Number(line), Number(column)];
    };

    switch (draft.type) {
      case ActionType.MoveCursor:
        return {
          type: ActionType.MoveCursor,
          position: positionFromDraft(draft.position),
        };

      case ActionType.InsertLines:
        return {
          type: ActionType.InsertLines,
          above: Number(draft.above),
          below: Number(draft.below),
        };

      case ActionType.TypeCode:
        return {
          type: ActionType.TypeCode,
          code: draft.code,
        };

      case ActionType.EraseCode:
        return {
          type: ActionType.EraseCode,
          end: positionFromDraft(draft.end),
        };
    }
  },
  createDraftAction(type: ReplayActionData['type']): DraftAction {
    switch (type) {
      case ActionType.MoveCursor:
        return { type: ActionType.MoveCursor, position: { line: '1', column: '1' } };

      case ActionType.InsertLines:
        return { type: ActionType.InsertLines, above: '0', below: '0' };

      case ActionType.TypeCode:
        return { type: ActionType.TypeCode, code: '' };

      case ActionType.EraseCode:
        return { type: ActionType.EraseCode, end: { line: '1', column: '1' } };
    }
  },
};
