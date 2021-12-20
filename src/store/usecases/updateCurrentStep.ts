import { ReplayStepData } from '../../../domain/Replay';
import { selectCurrentStep, selectReplay } from '../slices/replay.selectors';
import { ThunkAction } from '../store';

import { updateReplaySteps } from './updateReplaySteps';

export const updateCurrentStep = (cb: (step: ReplayStepData) => ReplayStepData): ThunkAction => {
  return (dispatch, getState) => {
    const { currentStepIndex } = selectReplay(getState());
    const currentStep = selectCurrentStep(getState());

    dispatch(
      updateReplaySteps((steps) => {
        steps[currentStepIndex] = cb(currentStep);
        return steps;
      }),
    );
  };
};
