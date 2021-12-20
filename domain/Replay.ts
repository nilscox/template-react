import { MemoryEditor } from './MemoryEditor';
import { ReplayStep } from './ReplayStep';
import { PlayedStepData, ReplayStepData } from './types';

export class Replay {
  constructor(private steps: ReplayStep[]) {
    this.play();
  }

  static create(steps: ReplayStepData[]) {
    return new Replay(steps.map(ReplayStep.create));
  }

  get data() {
    return {
      steps: this.steps.map((step) => step.data),
    };
  }

  play() {
    const editor = new MemoryEditor();

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

export const playReplay = (steps: ReplayStepData[]): PlayedStepData[] => {
  return Replay.create(steps).data.steps;
};
