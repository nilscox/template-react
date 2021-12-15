import { BaseAction } from './BaseAction';
import { CursorPosition, DraftPosition } from './CursorPosition';
import { InvalidActionError } from './InvalidActionError';
import { MemoryEditor } from './MemoryEditor';

export class TypeCodeAction extends BaseAction {
  readonly type = 'TypeCode';

  public prepare = {
    insertLinesAbove: 0,
    insertLinesBelow: 0,
  };

  constructor(private position: CursorPosition, private code: string) {
    super();

    if (!this.position.isValid() || this.prepare.insertLinesAbove < 0 || this.prepare.insertLinesAbove < 0) {
      throw new InvalidActionError(this);
    }
  }

  initialCursorPosition(): CursorPosition {
    return this.position;
  }

  finalCursorPosition(): CursorPosition {
    const { line, column } = this.position;
    const lines = this.code.split('\n');

    if (lines.length === 1) {
      return new CursorPosition(line, column + this.code.length);
    }

    return new CursorPosition(line - 1 + lines.length, lines[lines.length - 1].length);
  }

  toJSON() {
    return {
      type: this.type,
      position: this.position.toJSON(),
      code: this.code,
      prepare: this.prepare,
    };
  }

  toDraft(): DraftTypeCodeAction {
    return {
      type: 'TypeCode',
      position: this.position.toDraft(),
      code: this.code,
      prepare: {
        insertLinesAbove: String(this.prepare.insertLinesAbove),
        insertLinesBelow: String(this.prepare.insertLinesBelow),
      },
    };
  }

  static fromDraft(draft: DraftTypeCodeAction) {
    const action = new TypeCodeAction(CursorPosition.fromDraft(draft.position), draft.code);

    action.prepare.insertLinesAbove = Number(draft.prepare.insertLinesAbove);
    action.prepare.insertLinesBelow = Number(draft.prepare.insertLinesBelow);
  }

  apply(code: string): string {
    const editor = new MemoryEditor();

    editor.insertCode(code);
    editor.position = this.position.clone();

    if (this.prepare.insertLinesAbove > 0) {
      editor.insertLines(this.prepare.insertLinesAbove);
    }

    if (this.prepare.insertLinesBelow > 0) {
      editor.insertLinesBelow(this.prepare.insertLinesBelow);
    }

    editor.insertCode(this.code);

    return editor.code;
  }
}

export type DraftTypeCodeAction = {
  type: 'TypeCode';
  position: DraftPosition;
  code: string;
  prepare: {
    insertLinesAbove: string;
    insertLinesBelow: string;
  };
};
