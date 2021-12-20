import { ReplayStepData } from '../../../../domain/Replay';
import { ThunkAction } from '../../../store/store';
import { selectDraftStep } from '../editor.selectors';
import { DraftAction, removeDraftAction } from '../editor.slice';

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
