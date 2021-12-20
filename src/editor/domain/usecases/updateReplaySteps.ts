import { playReplay } from '../../../../domain/Replay';
import { ReplayStepData } from '../../../../domain/types';
import { selectReplay } from '../../../store/slices/replay.selectors';
import { setSteps } from '../../../store/slices/replay.slice';
import { ThunkAction } from '../../../store/store';

export const updateReplaySteps = (cb: (steps: ReplayStepData[]) => ReplayStepData[]): ThunkAction => {
  return (dispatch, getState) => {
    const replay = selectReplay(getState());
    const currentSteps = replay.steps.slice();
    const updatedSteps = cb(currentSteps);

    const playedSteps = playReplay(updatedSteps);

    dispatch(setSteps(playedSteps));
  };
};
