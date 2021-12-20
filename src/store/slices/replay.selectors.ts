import { createSelector } from '@reduxjs/toolkit';

import { MoveCursorActionData } from '../../../domain/types';
import { State } from '../store';

export const selectReplay = (state: State) => state.replay;

export const selectCurrentStep = createSelector(selectReplay, (replay) => {
  return replay.steps[replay.currentStepIndex];
});

export const selectCurrentInitialPosition = createSelector(selectCurrentStep, (step) => {
  const firstMoveCursor = step.actions.find(({ type }) => type === 'MoveCursor') as MoveCursorActionData;

  if (firstMoveCursor) {
    return firstMoveCursor.position;
  }
});
