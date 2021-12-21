import { playReplay } from '../../../../domain/Replay';
import { ReplayCommitData } from '../../../../domain/types';
import { setCurrentCommit } from '../../../editor/domain/usecases/setCurrentCommit';
import { setReplay } from '../../../store/slices/replay.slice';
import { ThunkAction } from '../../../store/store';

export const loadReplay = (commits: ReplayCommitData[]): ThunkAction => {
  return (dispatch) => {
    const playedCommits = playReplay(commits);

    dispatch(
      setReplay({
        commits: playedCommits,
        currentCommitIndex: 0,
        currentStepIndex: 0,
      }),
    );

    dispatch(setCurrentCommit(playedCommits[playedCommits.length - 1]));
  };
};
