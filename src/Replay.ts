import { ChunkAddition, ChunkRemoval } from './Chunk';

export type CursorPosition = [number, number];

type ReplayAction = ChunkAddition | ChunkRemoval;

export class Replay {
  private currentActionIndex: number;

  private constructor(readonly actions: ReplayAction[] = []) {
    this.currentActionIndex = actions.length;
  }

  static create(action?: ReplayAction[]) {
    return new Replay(action ?? []);
  }

  get currentAction(): ReplayAction {
    return this.actions[this.currentActionIndex];
  }

  get cursorPosition(): CursorPosition {
    if (!this.currentAction) {
      const lastAction = this.actions[this.actions.length - 1];
      return lastAction.finalCursorPosition;
    }

    return this.currentAction.initialCursorPosition;
  }

  get nextCursorPosition(): CursorPosition {
    if (!this.currentAction) {
      throw new Error('Replay.nextCursorPosition: no current action');
    }

    return this.currentAction.finalCursorPosition;
  }

  get progress() {
    return this.currentActionIndex / this.actions.length;
  }

  addChunk(chunk: ChunkAddition | ChunkRemoval) {
    this.actions.push(chunk);
    this.currentActionIndex++;
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
      .reduce((code, chunk) => chunk.apply(code), '');
  }
}
