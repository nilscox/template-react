import { MemoryEditor } from './MemoryEditor';
import { ReplayCommit } from './ReplayCommit';
import { PlayedCommitData, ReplayCommitData } from './types';

export class Replay {
  public commits: ReplayCommit[];

  constructor(public props: { commits: PlayedCommitData[] }) {
    let previousCommit: ReplayCommit | null = null;

    this.commits = props.commits.map((commit) => {
      previousCommit = ReplayCommit.create(commit, previousCommit);
      return previousCommit;
    });
  }

  static load(commits: ReplayCommitData[]) {
    const replay = Replay.create(commits as PlayedCommitData[]);

    replay.play();

    return replay;
  }

  static create(commits: PlayedCommitData[]) {
    return new Replay({ commits });
  }

  get lastCommit() {
    return this.commits[this.commits.length - 1];
  }

  addCommit() {
    this.commits.push(ReplayCommit.create({ name: '', steps: [] }, this.lastCommit));
    this.props.commits.push(this.lastCommit.props);
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
  const replay = Replay.create(commits);

  replay.play();

  return replay.data.commits;
};
