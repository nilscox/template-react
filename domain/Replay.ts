import { MemoryEditor } from './MemoryEditor';
import { ReplayStep } from './ReplayStep';
import { PlayedStepData, ReplayStepData } from './types';

export class Replay {
  constructor(private steps: ReplayStep[]) {}

  static create(steps: ReplayStepData[]) {
    return new Replay(steps.map(ReplayStep.create));
  }

  play(): PlayedStepData[] {
    const editor = new MemoryEditor();
    const playedSteps: PlayedStepData[] = [];

    for (const step of this.steps) {
      const initialPosition = editor.position.values;
      const initialCode = editor.code;

      step.apply(editor);

      playedSteps.push({
        ...step.data,
        initialState: {
          code: initialCode,
          position: initialPosition,
        },
        finalState: {
          code: editor.code,
          position: editor.position.values,
        },
      });
    }

    return playedSteps;
  }
}
