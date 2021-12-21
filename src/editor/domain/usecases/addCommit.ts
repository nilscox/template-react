import { PlayedCommitData } from '../../../../domain/types';
import { addCommit as addCommitAction } from '../../../store/slices/replay.slice';
import { ThunkAction } from '../../../store/store';

import { setCurrentCommit } from './setCurrentCommit';

export const addCommit = (): ThunkAction => {
  return (dispatch) => {
    const commit: PlayedCommitData = {
      name: '',
      steps: [],
    };

    dispatch(addCommitAction(commit));
    dispatch(setCurrentCommit(commit));
  };
};
