import { TypeCode } from './actions/TypeCode';
import { CursorPosition } from './CursorPosition';
import { ReplayAction } from './ReplayAction';
import { TimeManager } from './TimeManager';

export type Range = [CursorPosition, CursorPosition];

const actionClasses: Record<ReplayAction['type'], { from(object: any): ReplayAction }> = {
  TypeCode,
};

export class Replay {
  private currentActionIndex: number;

  time = new TimeManager();

  constructor(readonly actions: ReplayAction[] = []) {
    this.currentActionIndex = actions.length;
  }

  static from(object: any) {
    const instantiateAction = (action: any) => {
      return actionClasses[action.type].from(action);
    };

    const replay = new Replay(object.actions.map(instantiateAction));

    replay.currentActionIndex = object.currentActionIndex;

    return replay;
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

  get progress() {
    return this.currentActionIndex / this.actions.length;
  }

  addAction(action: ReplayAction) {
    this.actions.push(action);
    action.setReplay(this);
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
}
