import { createSelector } from '@reduxjs/toolkit';

import { EditorState, MoveCursorActionData, PlayedCommitData, PlayedStepData } from '../../../domain/types';
import { State } from '../store';

export const selectReplay = (state: State) => state.replay;

export const selectCommits = createSelector(selectReplay, ({ commits }) => commits);
export const selectCurrentCommitIndex = createSelector(selectReplay, ({ currentCommitIndex }) => currentCommitIndex);
export const selectCurrentStepIndex = createSelector(selectReplay, ({ currentStepIndex }) => currentStepIndex);

export const selectCurrentCommit = createSelector(
  selectCommits,
  selectCurrentCommitIndex,
  (commits, index): PlayedCommitData | undefined => {
    return commits[index];
  },
);

export const selectCurrentStep = createSelector(
  selectCurrentCommit,
  selectCurrentStepIndex,
  (commit, index): PlayedStepData | undefined => {
    return commit?.steps[index];
  },
);

export const selectAllSteps = createSelector(selectCommits, (commits) => {
  return commits.flatMap(({ steps }) => steps);
});

export const selectNextStep = createSelector(selectAllSteps, selectCurrentStep, (allSteps, currentStep) => {
  const index = allSteps.indexOf(currentStep as PlayedStepData);

  if (index < 0) {
    return allSteps[0];
  }

  return allSteps[index + 1];
});

export const selectCurrentInitialPosition = createSelector(selectCurrentStep, (step) => {
  const firstMoveCursor = step?.actions.find(({ type }) => type === 'MoveCursor') as MoveCursorActionData;

  if (firstMoveCursor) {
    return firstMoveCursor.position;
  }
});

export const selectInitialState = createSelector(selectCurrentStep, (step): EditorState => {
  if (!step) {
    return { code: '', position: [1, 1] };
  }

  return step.initialState;
});

export const selectFinalState = createSelector(selectCurrentStep, (step): EditorState => {
  if (!step) {
    return { code: '', position: [1, 1] };
  }

  return step.finalState;
});
