import { ReplayStepData } from '../../../../domain/Replay';
import { selectReplay } from '../../../store/slices/replay.selectors';
import { ThunkAction } from '../../../store/store';

import { setCurrentStep } from './setCurrentStep';
import { updateReplaySteps } from './updateReplaySteps';

export const addStep = (): ThunkAction => {
  return (dispatch, getState) => {
    dispatch(updateReplaySteps(updater));

    const replay = selectReplay(getState());
    const newStep = replay.steps[replay.steps.length - 1];

    dispatch(setCurrentStep(newStep));
  };
};

const updater = (steps: ReplayStepData[]): ReplayStepData[] => {
  steps.push({
    name: '',
    actions: [],
  });

  return steps;
};
