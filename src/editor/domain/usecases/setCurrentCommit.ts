import { PlayedCommitData } from '../../../../domain/types';
import { selectCommits } from '../../../store/slices/replay.selectors';
import { setCurrentCommitIndex } from '../../../store/slices/replay.slice';
import { ThunkAction } from '../../../store/store';
import { setDraftStep } from '../editor.slice';

import { setCurrentStep } from './setCurrentStep';

export const setCurrentCommit = (commit: PlayedCommitData): ThunkAction => {
  return (dispatch, getState, { editors }) => {
    const commits = selectCommits(getState());
    const index = commits.indexOf(commit);

    if (index < 0) {
      throw new Error('setCurrentCommit: commit not found');
    }

    dispatch(setCurrentCommitIndex(index));

    if (commit.steps.length > 0) {
      dispatch(setCurrentStep(commits[index].steps[0]));
    } else {
      dispatch(setDraftStep(undefined));

      const allStepsBeforeCommit = commits.slice(0, index).flatMap(({ steps }) => steps);
      const lastStep = allStepsBeforeCommit[allStepsBeforeCommit.length - 1];

      if (lastStep) {
        const { code, position } = lastStep.finalState;

        editors.diffEditor.valueBefore = code;
        editors.diffEditor.valueAfter = code;

        editors.textEditor.value = code;
        editors.textEditor.position = position;
      }
    }
  };
};
