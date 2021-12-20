import { ReplayActionData, ReplayStepData } from '../../../../domain/Replay';
import { ThunkAction } from '../../../store/store';
import { draft } from '../draft';
import { addDraftAction } from '../editor.slice';

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
