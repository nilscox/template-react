import { createSelector } from '@reduxjs/toolkit';

import { State } from '../store';

export const selectReplay = (state: State) => state.replay;

export const selectCurrentAction = createSelector(selectReplay, (replay) => {
  return replay.actions[replay.currentActionIndex];
});

export const selectCurrentInitialPosition = createSelector(selectCurrentAction, (action) => {
  if (action.type === 'TypeCode') {
    return action.position;
  }

  if (action.type === 'EraseCode') {
    return action.end;
  }

  throw new Error();
});
