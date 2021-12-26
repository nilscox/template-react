import { CommitData, Replay as ReplayProps, ReplayData } from '../replay.slice';

import { Commit } from './Commit';
import { MemoryEditor } from './MemoryEditor';

export class Replay {
  static create(overrides: Partial<ReplayProps> = {}) {
    return new Replay({
      commits: [],
      ...overrides,
    });
  }

  private commits: Commit[];

  constructor(public props: ReplayProps) {
    this.commits = props.commits.map((commit) => new Commit(commit));
  }

  static load(data: ReplayData): Replay {
    const replay = new Replay({ commits: [] });

    for (const commit of data.commits) {
      replay.addCommit(commit);
    }

    return replay;
  }

  private play() {
    const editor = new MemoryEditor();

    for (const commit of this.commits) {
      commit.apply(editor);
    }
  }

  addCommit(commitData: CommitData) {
    const commit = new Commit({
      name: commitData.name,
      steps: [],
    });

    for (const step of commitData.steps) {
      commit.addStep(step);
    }

    this.commits.push(commit);
    this.props.commits.push(commit.props);

    this.play();
  }
}
