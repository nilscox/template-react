import { setCurrentStep } from '../../../editor/domain/usecases/setCurrentStep';
import { selectCurrentStep, selectReplay } from '../../../store/slices/replay.selectors';
import { ThunkAction } from '../../../store/store';

import { playAction } from './playActions';

export const playCurrentAction = (): ThunkAction<Promise<void>> => {
  return async (dispatch, getState) => {
    const replay = selectReplay(getState());
    const currentStep = selectCurrentStep(getState());
    const currentStepIndex = replay.currentStepIndex;

    if (currentStepIndex === replay.steps.length) {
      return;
    }

    for (const action of currentStep.actions) {
      await dispatch(playAction(action));
    }

    dispatch(setCurrentStep(replay.steps[currentStepIndex + 1]));
  };
};
