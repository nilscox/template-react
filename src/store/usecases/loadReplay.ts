import { Replay, ReplayStepData } from '../../../domain/Replay';
import { setReplay } from '../slices/replay.slice';
import { ThunkAction } from '../store';

import { setCurrentStep } from './setCurrentStep';

export const loadReplay = (steps: ReplayStepData[]): ThunkAction => {
  return (dispatch) => {
    const playedSteps = Replay.create(steps).play();

    dispatch(
      setReplay({
        steps: playedSteps,
        currentStepIndex: 0,
      }),
    );

    dispatch(setCurrentStep(playedSteps[0]));
  };
};
