import { BaseAction } from './BaseAction';
import { CursorPosition, DraftPosition } from './CursorPosition';
import { InvalidActionError } from './InvalidActionError';

export class EraseCodeAction extends BaseAction {
  readonly type = 'EraseCode';

  constructor(private start: CursorPosition, private end: CursorPosition) {
    super();

    if (!this.start.isValid() || !this.end.isValid()) {
      throw new InvalidActionError(this);
    }
  }

  initialCursorPosition(): CursorPosition {
    return this.end;
  }

  finalCursorPosition(): CursorPosition {
    return this.start;
  }

  toJSON() {
    return {
      type: this.type,
      start: this.start.toJSON(),
      end: this.end.toJSON(),
    };
  }

  toDraft(): DraftEraseCodeAction {
    return {
      type: 'EraseCode',
      start: this.start.toDraft(),
      end: this.end.toDraft(),
    };
  }

  static fromDraft(draft: DraftEraseCodeAction) {
    return new EraseCodeAction(CursorPosition.fromDraft(draft.start), CursorPosition.fromDraft(draft.end));
  }

  apply(code: string): string {
    const { line: startLine, column: startColumn } = this.start;
    const { line: endLine, column: endColumn } = this.end;
    const lines = code.split('\n');

    const lineBefore = lines[startLine - 1].slice(0, startColumn - 1);
    const lineAfter = lines[endLine - 1].slice(endColumn - 1);

    // prettier-ignore
    return [
      ...lines.slice(0, startLine - 1),
      [lineBefore, lineAfter].join(''),
      ...lines.slice(endLine),
    ].join('\n');
  }
}

export type DraftEraseCodeAction = {
  type: 'EraseCode';
  start: DraftPosition;
  end: DraftPosition;
};
