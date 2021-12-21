import { PlayedStepData } from '../../../../domain/types';
import {
  selectCurrentCommit,
  selectCurrentCommitIndex,
  selectFinalState,
  selectInitialState,
} from '../../../store/slices/replay.selectors';
import { setSteps } from '../../../store/slices/replay.slice';
import { ThunkAction } from '../../../store/store';

import { setCurrentStep } from './setCurrentStep';

export const addStep = (): ThunkAction => {
  return (dispatch, getState) => {
    const commit = selectCurrentCommit(getState());
    const currentCommitIndex = selectCurrentCommitIndex(getState());

    const initialState = selectInitialState(getState());
    const finalState = selectFinalState(getState());

    const newStep: PlayedStepData = { name: '', actions: [], initialState, finalState };

    dispatch(
      setSteps({
        commitIndex: currentCommitIndex,
        steps: [...commit.steps, newStep],
      }),
    );

    dispatch(setCurrentStep(newStep));
  };
};
