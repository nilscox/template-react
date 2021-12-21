import { PlayedCommitData } from '../../../../domain/types';
import { selectCommits } from '../../../store/slices/replay.selectors';
import { setCurrentCommitIndex } from '../../../store/slices/replay.slice';
import { ThunkAction } from '../../../store/store';

import { setCurrentStep } from './setCurrentStep';

export const setCurrentCommit = (commit: PlayedCommitData): ThunkAction => {
  return (dispatch, getState) => {
    const commits = selectCommits(getState());
    const index = commits.indexOf(commit);

    if (index < 0) {
      return;
    }

    dispatch(setCurrentCommitIndex(index));
    dispatch(setCurrentStep(commits[index].steps[0]));
  };
};
