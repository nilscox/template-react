import { setCurrentStep } from '../../../editor/domain/usecases/setCurrentStep';
import { selectCurrentStep, selectNextStep } from '../../../store/slices/replay.selectors';
import { ThunkAction } from '../../../store/store';

import { playAction } from './playActions';

export const playCurrentStep = (): ThunkAction<Promise<void>> => {
  return async (dispatch, getState) => {
    const currentStep = selectCurrentStep(getState());

    if (!currentStep) {
      return;
    }

    for (const action of currentStep.actions) {
      await dispatch(playAction(action));
    }

    const nextStep = selectNextStep(getState());

    if (!nextStep) {
      throw new Error('todo');
    }

    dispatch(setCurrentStep(nextStep));
  };
};
