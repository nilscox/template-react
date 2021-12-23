import { playReplay } from '../../../../domain/Replay';
import { ReplayStepData } from '../../../../domain/types';
import { selectCurrentCommit, selectCurrentCommitIndex, selectReplay } from '../../../store/slices/replay.selectors';
import { setCommits } from '../../../store/slices/replay.slice';
import { ThunkAction } from '../../../store/store';

export const updateReplaySteps = (cb: (steps: ReplayStepData[]) => ReplayStepData[]): ThunkAction => {
  return (dispatch, getState) => {
    const replay = selectReplay(getState());
    const commits = replay.commits.slice();

    const currentCommit = selectCurrentCommit(getState());
    const currentCommitIndex = selectCurrentCommitIndex(getState());

    const updatedSteps = cb(commits[currentCommitIndex].steps.slice());

    // const playedCommits = playReplay([
    //   ...commits.slice(0, currentCommitIndex),
    //   { ...currentCommit, steps: updatedSteps },
    //   ...commits.slice(currentCommitIndex + 1),
    // ]);

    // dispatch(setCommits(playedCommits));
  };
};
