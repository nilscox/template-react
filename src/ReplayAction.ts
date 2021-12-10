import { CursorPosition } from './Replay';

export abstract class ReplayAction {
  prevAction?: ReplayAction;
  nextAction?: ReplayAction;

  get initialCursorPosition(): CursorPosition | undefined {
    return this.prevAction?.initialCursorPosition;
  }

  get finalCursorPosition(): CursorPosition | undefined {
    return this.nextAction?.finalCursorPosition;
  }

  abstract apply(code: string): string | void;
}
