import { MemoryEditor } from './MemoryEditor';
import { ReplayCommit } from './ReplayCommit';
import { PlayedCommitData, ReplayCommitData } from './types';

export class Replay {
  constructor(private commits: ReplayCommit[]) {
    this.play();
  }

  static create(steps: ReplayCommitData[]) {
    return new Replay(steps.map(ReplayCommit.create));
  }

  get data() {
    return {
      commits: this.commits.map((commit) => commit.data),
    };
  }

  play() {
    const editor = new MemoryEditor();

    for (const commit of this.commits) {
      commit.apply(editor);
    }
  }
}

export const playReplay = (commits: ReplayCommitData[]): PlayedCommitData[] => {
  return Replay.create(commits).data.commits;
};
