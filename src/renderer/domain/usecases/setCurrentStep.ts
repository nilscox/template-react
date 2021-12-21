import { PlayedStepData } from '../../../../domain/types';
import { selectCurrentCommit } from '../../../store/slices/replay.selectors';
import { setCurrentStepIndex } from '../../../store/slices/replay.slice';
import { ThunkAction } from '../../../store/store';

export const setCurrentStep = (step: PlayedStepData | undefined): ThunkAction => {
  return (dispatch, getState, { editors }) => {
    if (!step) {
      editors.textEditor.value = '';
      editors.textEditor.position = [1, 1];
      return;
    }

    const commit = selectCurrentCommit(getState());
    const index = commit.steps.indexOf(step);

    if (index < 0) {
      throw new Error('setCurrentStep: step not found');
    }

    dispatch(setCurrentStepIndex(index));

    editors.textEditor.value = step.initialState.code;
    editors.textEditor.position = step.initialState.position;
  };
};
