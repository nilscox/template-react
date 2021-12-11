import { Editor } from './Editor';
import { Replay } from './Replay';
import { TimeManager } from './TimeManager';

export abstract class ReplayAction {
  abstract type: string;

  protected replay?: Replay;

  protected prevAction?: ReplayAction;
  protected nextAction?: ReplayAction;

  get time() {
    return this.replay?.time;
  }

  setReplay(replay: Replay) {
    this.replay = replay;
  }

  abstract play(editor: Editor): Promise<void>;

  protected wait = async (...params: Parameters<TimeManager['wait']>) => {
    await this.time?.wait(...params);
  };
}
