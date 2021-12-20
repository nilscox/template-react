import { PlayedStepData } from '../../../../domain/Replay';
import { selectReplay } from '../../../store/slices/replay.selectors';
import { setCurrentStepIndex } from '../../../store/slices/replay.slice';
import { ThunkAction } from '../../../store/store';

export const setCurrentStep = (step: PlayedStepData): ThunkAction => {
  return (dispatch, getState, { editors }) => {
    const replay = selectReplay(getState());
    const index = replay.steps.indexOf(step);

    if (index < 0) {
      throw new Error('setCurrentStep: step not found');
    }

    dispatch(setCurrentStepIndex(index));

    editors.textEditor.value = step.initialState.code;
    editors.textEditor.position = step.initialState.position;
  };
};
