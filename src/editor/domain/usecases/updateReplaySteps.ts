import { Replay, ReplayStepData } from '../../../../domain/Replay';
import { selectReplay } from '../../../store/slices/replay.selectors';
import { setSteps } from '../../../store/slices/replay.slice';
import { ThunkAction } from '../../../store/store';

export const updateReplaySteps = (cb: (steps: ReplayStepData[]) => ReplayStepData[]): ThunkAction => {
  return (dispatch, getState) => {
    const replay = selectReplay(getState());
    const currentSteps = replay.steps.slice();
    const updatedSteps = cb(currentSteps);

    const playedSteps = Replay.create(updatedSteps).play();

    dispatch(setSteps(playedSteps));
  };
};
