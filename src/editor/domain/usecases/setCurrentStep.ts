import { PlayedStepData } from '../../../../domain/types';
import { setCurrentStep as setCurrentRendererStep } from '../../../renderer/domain/usecases/setCurrentStep';
import { ThunkAction } from '../../../store/store';
import { draft } from '../draft';
import { setDraftStep } from '../editor.slice';

export const setCurrentStep = (step: PlayedStepData): ThunkAction => {
  return (dispatch, _getState, { editors }) => {
    dispatch(setCurrentRendererStep(step));
    dispatch(setDraftStep(draft.transformStepToDraft(step)));

    editors.diffEditor.valueBefore = step.initialState.code;
    editors.diffEditor.valueAfter = step.finalState.code;
  };
};
