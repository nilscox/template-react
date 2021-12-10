import { editor } from 'monaco-editor';

import { CursorPosition } from './Replay';

export abstract class ReplayAction {
  abstract type: string;

  prevAction?: ReplayAction;
  nextAction?: ReplayAction;

  get initialCursorPosition(): CursorPosition | undefined {
    return this.prevAction?.initialCursorPosition;
  }

  get finalCursorPosition(): CursorPosition | undefined {
    return this.nextAction?.finalCursorPosition;
  }

  protected async wait(ms: number) {
    await new Promise((r) => setTimeout(r, ms));
  }

  apply(code: string): string {
    return this.prevAction?.apply(code) ?? '';
  }

  abstract playForward(editor: editor.IEditor): Promise<void>;
}
