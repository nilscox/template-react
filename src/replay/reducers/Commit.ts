import { Commit as CommitProps, ReplayAction, StepData } from '../replay.slice';

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
    this.insertStep(this.steps.length, stepData);
  }

  insertStep(index: number, stepData: StepData) {
    const step = new Step({
      name: stepData.name,
      actions: stepData.actions,
      initialState: { code: '', position: [1, 1] },
      finalState: { code: '', position: [1, 1] },
    });

    this.steps.splice(index, 0, step);
    this.props.steps.splice(index, 0, step.props);
  }

  insertAction(stepIndex: number, actionIndex: number, actionData: ReplayAction) {
    this.steps[stepIndex].insertAction(actionIndex, actionData);
  }

  apply(editor: MemoryEditor) {
    for (const step of this.steps) {
      step.apply(editor);
    }
  }
}
