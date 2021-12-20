import { playReplay } from '../../../../domain/Replay';
import { ReplayStepData } from '../../../../domain/types';
import { setCurrentStep } from '../../../editor/domain/usecases/setCurrentStep';
import { setReplay } from '../../../store/slices/replay.slice';
import { ThunkAction } from '../../../store/store';

export const loadReplay = (steps: ReplayStepData[]): ThunkAction => {
  return (dispatch) => {
    const playedSteps = playReplay(steps);

    dispatch(
      setReplay({
        steps: playedSteps,
        currentStepIndex: 0,
      }),
    );

    dispatch(setCurrentStep(playedSteps[0]));
  };
};
