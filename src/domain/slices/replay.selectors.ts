import { createSelector } from '@reduxjs/toolkit';

import { State } from '../store';

export const selectReplay = (state: State) => state.replay;

export const selectAction = createSelector(
  selectReplay,
  (_: unknown, actionId: string) => actionId,
  (replay, actionId) => {
    return replay.actions.find((action) => action.id === actionId);
  },
);

export const selectCurrentAction = createSelector(selectReplay, (replay) => {
  return replay.actions[replay.currentActionIndex];
});
