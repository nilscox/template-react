import { DraftAction, DraftPosition, Position, ReplayAction } from './types/entities';

export class InvalidDraftActionError extends Error {
  constructor(readonly action: DraftAction) {
    super('Invalid draft action');
  }
}

export const actionToDraft = (action: ReplayAction): DraftAction => {
  if (action.type === 'TypeCode') {
    return {
      type: 'TypeCode',
      position: positionToDraft(action.position),
      code: action.code,
      prepare: {
        insertLinesAbove: String(action.prepare.insertLinesAbove ?? 0),
        insertLinesBelow: String(action.prepare.insertLinesBelow ?? 0),
      },
    };
  }

  if (action.type === 'EraseCode') {
    return {
      type: 'EraseCode',
      start: positionToDraft(action.start),
      end: positionToDraft(action.end),
    };
  }

  throw new Error(`draftToAction: unknown action type "${(action as any).type}"`);
};

const positionToDraft = (position: Position): DraftPosition => ({
  line: String(position.line),
  column: String(position.column),
});

export const draftToAction = (draft: DraftAction): ReplayAction => {
  if (draft.type === 'TypeCode') {
    const action: any = {
      type: 'TypeCode',
      position: draftToPosition(draft.position),
      code: draft.code,
      prepare: {
        insertLinesAbove: Number(draft.prepare.insertLinesAbove),
        insertLinesBelow: Number(draft.prepare.insertLinesBelow),
      },
    };

    if (
      !isPositionValid(action.position) ||
      action.prepare.insertLinesAbove < 0 ||
      action.prepare.insertLinesAbove < 0
    ) {
      throw new InvalidDraftActionError(draft);
    }

    return action;
  }

  if (draft.type === 'EraseCode') {
    const action: any = {
      type: 'EraseCode',
      start: draftToPosition(draft.start),
      end: draftToPosition(draft.end),
    };

    if (!isPositionValid(action.start) || !isPositionValid(action.end)) {
      throw new InvalidDraftActionError(draft);
    }

    return action;
  }

  throw new Error(`draftToAction: unknown action type "${(draft as any).type}"`);
};

const isPositionValid = (position: Position) => {
  return (
    Number.isInteger(position.line) && position.line > 0 && Number.isInteger(position.column) && position.column > 0
  );
};

const draftToPosition = (draft: DraftPosition): Position => ({
  line: Number(draft.line),
  column: Number(draft.column),
});
