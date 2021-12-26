import { Commit as CommitProps, StepData } from '../replay.slice';

import { MemoryEditor } from './MemoryEditor';
import { Step } from './Step';

export class Commit {
  static create(overrides: Partial<CommitProps> = {}) {
    return new Commit({
      name: 'commit',
      steps: [],
      ...overrides,
    });
  }

  private steps: Step[];

  constructor(public props: CommitProps) {
    this.steps = props.steps.map((step) => new Step(step));
  }

  setName(name: string) {
    this.props.name = name;
  }

  addStep(stepData: StepData) {
    const step = new Step({
      name: stepData.name,
      actions: stepData.actions,
      initialState: { code: '', position: [1, 1] },
      finalState: { code: '', position: [1, 1] },
    });

    this.steps.push(step);
    this.props.steps.push(step.props);

    this.apply(new MemoryEditor(this.steps[0].props.initialState));
  }

  apply(editor: MemoryEditor) {
    for (const step of this.steps) {
      step.apply(editor);
    }
  }
}
