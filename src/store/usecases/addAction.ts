import { ReplayActionData, ReplayStepData } from '../../../domain/Replay';
import { addDraftAction } from '../slices/editor.slice';
import { ThunkAction } from '../store';

import { draft } from './setCurrentStep';
import { updateCurrentStep } from './updateCurrentStep';

export const addAction = (type: ReplayActionData['type']): ThunkAction => {
  return (dispatch) => {
    const draftAction = draft.createDraftAction(type);

    dispatch(addDraftAction(draftAction));
    dispatch(updateCurrentStep(updater(draft.transformActionFromDraft(draftAction))));
  };
};

const updater = (action: ReplayActionData) => (step: ReplayStepData) => ({
  ...step,
  actions: [...step.actions, action],
});
