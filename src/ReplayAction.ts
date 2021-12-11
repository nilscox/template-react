import { Editor } from './Editor';
import { Replay } from './Replay';
import { TimeManager } from './TimeManager';

export abstract class ReplayAction {
  abstract type: string;

  protected replay?: Replay;

  get time() {
    return this.replay?.time;
  }

  setReplay(replay: Replay) {
    this.replay = replay;
  }

  abstract toJson(): object;
  abstract play(editor: Editor): Promise<void>;

  protected wait = async (...params: Parameters<TimeManager['wait']>) => {
    await this.time?.wait(...params);
  };
}
