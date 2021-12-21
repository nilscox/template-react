import { MemoryEditor } from './MemoryEditor';
import { ReplayStep } from './ReplayStep';
import { PlayedCommitData, ReplayCommitData } from './types';

export class ReplayCommit {
  constructor(private name: string, private steps: ReplayStep[]) {}

  static create(commit: ReplayCommitData): ReplayCommit {
    return new ReplayCommit(commit.name, commit.steps.map(ReplayStep.create));
  }

  get data(): PlayedCommitData {
    return {
      name: this.name,
      steps: this.steps.map((step) => step.data),
    };
  }

  apply(editor: MemoryEditor) {
    for (const step of this.steps) {
      step.initialState = {
        code: editor.code,
        position: editor.position.values,
      };

      step.apply(editor);

      step.finalState = {
        code: editor.code,
        position: editor.position.values,
      };
    }
  }
}
