import produce from 'immer';

import { InvalidActionError } from '../../../../domain/InvalidActionError';
import { playReplay } from '../../../../domain/Replay';
import { ReplayCommitData } from '../../../../domain/types';
import {
  selectCommits,
  selectCurrentCommitIndex,
  selectCurrentStep,
  selectCurrentStepIndex,
} from '../../../store/slices/replay.selectors';
import { setCommits } from '../../../store/slices/replay.slice';
import { ThunkAction } from '../../../store/store';
import { draft } from '../draft';
import { selectDraftStep } from '../editor.selectors';
import { DraftAction, updateDraftStep } from '../editor.slice';

export const updateDraftAction = (action: DraftAction, path: string, value: string): ThunkAction => {
  return (dispatch, getState) => {
    const draftStep = selectDraftStep(getState());

    if (!draftStep) {
      return;
    }

    const index = draftStep.actions.indexOf(action);

    dispatch(updateDraftStep({ path: `actions.${index}.${path}`, value }));

    const commits = selectCommits(getState());

    const currentCommitIndex = selectCurrentCommitIndex(getState());
    const currentStepIndex = selectCurrentStepIndex(getState());

    const currentStep = selectCurrentStep(getState());

    const newStep = draft.transformStepFromDraft(currentStep.name, draftStep);

    const newCommits = produce(commits as ReplayCommitData[], (draftCommits) => {
      draftCommits[currentCommitIndex].steps[currentStepIndex] = newStep;
    });

    try {
      const playedCommits = playReplay(newCommits);

      dispatch(setCommits(playedCommits));
    } catch (error) {
      if (!(error instanceof InvalidActionError)) {
        throw error;
      }
    }
  };
};
