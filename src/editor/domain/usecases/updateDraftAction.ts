import { InvalidActionError } from '../../../../domain/InvalidActionError';
import { Replay, ReplayStepData } from '../../../../domain/Replay';
import { selectCurrentStep, selectReplay } from '../../../store/slices/replay.selectors';
import { setSteps } from '../../../store/slices/replay.slice';
import { ThunkAction } from '../../../store/store';
import { draft } from '../draft';
import { selectDraftStep } from '../editor.selectors';
import { DraftAction, updateDraftStep } from '../editor.slice';

import { setCurrentStep } from './setCurrentStep';

export const updateDraftAction = (action: DraftAction, path: string, value: string): ThunkAction => {
  return (dispatch, getState) => {
    const dratStep = selectDraftStep(getState());
    const index = dratStep?.actions.indexOf(action);

    dispatch(updateDraftStep({ path: `actions.${index}.${path}`, value }));

    const replay = selectReplay(getState());
    const steps: ReplayStepData[] = replay.steps.slice();
    const currentStep = selectCurrentStep(getState());
    const draftAction = selectDraftStep(getState());

    if (!draftAction) {
      return;
    }

    steps[replay.currentStepIndex] = draft.transformStepFromDraft(currentStep.name, draftAction);

    try {
      const playedActions = Replay.create(steps).play();

      dispatch(setSteps(playedActions));
      dispatch(setCurrentStep(playedActions[replay.currentStepIndex]));
    } catch (error) {
      if (!(error instanceof InvalidActionError)) {
        throw error;
      }
    }
  };
};
