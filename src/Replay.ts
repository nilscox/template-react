import { ReplayAction } from './ReplayAction';

export type CursorPosition = [number, number];
export type Range = [CursorPosition, CursorPosition];

export class Replay {
  private currentActionIndex: number;

  private constructor(readonly actions: ReplayAction[] = []) {
    this.currentActionIndex = actions.length;
  }

  static create(action?: ReplayAction[]) {
    return new Replay(action ?? []);
  }

  get currentAction(): ReplayAction | undefined {
    return this.actions[this.currentActionIndex];
  }

  set currentAction(action: ReplayAction | undefined) {
    if (!action) {
      this.currentActionIndex = this.actions.length;
      return;
    }

    const index = this.actions.indexOf(action);

    if (index < 0) {
      throw new Error('Replay.currentAction setter: action not found');
    }

    this.currentActionIndex = index;
  }

  get cursorPosition(): CursorPosition {
    if (!this.currentAction) {
      return this.actions[this.actions.length - 1].finalCursorPosition ?? [1, 1];
    }

    return this.currentAction?.initialCursorPosition || [1, 1];
  }

  get nextCursorPosition(): CursorPosition | undefined {
    return this.currentAction?.finalCursorPosition;
  }

  get progress() {
    return this.currentActionIndex / this.actions.length;
  }

  addAction(action: ReplayAction) {
    this.actions.push(action);
  }

  reset() {
    this.currentActionIndex = 0;
  }

  nextAction() {
    if (this.currentActionIndex === this.actions.length) {
      throw new Error('Replay.nextAction: already on the last action');
    }

    this.currentActionIndex++;
  }

  get code() {
    // prettier-ignore
    return this.actions
      .slice(0, this.currentActionIndex)
      .reduce((code, action) => action.apply(code) ?? code, '');
  }
}
