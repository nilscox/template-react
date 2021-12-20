import { ReplayStepData } from '../../../domain/Replay';
import { selectReplay } from '../slices/replay.selectors';
import { ThunkAction } from '../store';

import { setCurrentStep } from './setCurrentStep';
import { updateReplaySteps } from './updateReplaySteps';

export const addStep = (): ThunkAction => {
  return (dispatch, getState) => {
    const { currentStepIndex } = selectReplay(getState());

    dispatch(updateReplaySteps(updater(currentStepIndex)));

    const replay = selectReplay(getState());
    const newStep = replay.steps[currentStepIndex + 1] ?? replay.steps[currentStepIndex];

    dispatch(setCurrentStep(newStep));
  };
};

const updater =
  (currentStepIndex: number) =>
  (steps: ReplayStepData[]): ReplayStepData[] => {
    steps.splice(currentStepIndex + 1, 0, {
      name: '',
      actions: [],
    });

    return steps;
  };
