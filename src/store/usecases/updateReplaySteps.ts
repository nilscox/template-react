import { Replay, ReplayStepData } from '../../../domain/Replay';
import { selectReplay } from '../slices/replay.selectors';
import { setSteps } from '../slices/replay.slice';
import { ThunkAction } from '../store';

export const updateReplaySteps = (cb: (steps: ReplayStepData[]) => ReplayStepData[]): ThunkAction => {
  return (dispatch, getState) => {
    const replay = selectReplay(getState());
    const currentSteps = replay.steps.slice();
    const updatedSteps = cb(currentSteps);

    const playedSteps = Replay.create(updatedSteps).play();

    dispatch(setSteps(playedSteps));
  };
};
