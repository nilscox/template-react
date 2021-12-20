import { ReplayStepData } from '../../../domain/Replay';
import { selectDraftStep } from '../slices/editor.selectors';
import { DraftAction, removeDraftAction } from '../slices/editor.slice';
import { ThunkAction } from '../store';

import { updateCurrentStep } from './updateCurrentStep';

export const removeAction = (action: DraftAction): ThunkAction => {
  return (dispatch, getState) => {
    const draftStep = selectDraftStep(getState());
    const index = draftStep?.actions.indexOf(action) ?? -1;

    if (index < 0) {
      return;
    }

    dispatch(removeDraftAction(index));
    dispatch(updateCurrentStep(updater(index)));
  };
};

const updater = (index: number) => (step: ReplayStepData) => {
  const actions = step.actions.slice();

  actions.splice(index, 1);

  return {
    ...step,
    actions,
  };
};
