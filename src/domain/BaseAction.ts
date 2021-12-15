import { DraftAction } from '../store/types/entities';

import { CursorPosition } from './CursorPosition';

export abstract class BaseAction {
  abstract initialCursorPosition(): CursorPosition;
  abstract finalCursorPosition(): CursorPosition;

  // todo
  abstract toJSON(): any;

  abstract toDraft(): DraftAction;

  static fromDraft(draft: DraftAction) {
    throw new Error('not implemented');
  }

  abstract apply(code: string): string;
}
