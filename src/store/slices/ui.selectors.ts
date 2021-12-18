import { createSelector } from '@reduxjs/toolkit';

import { State } from '../store';

const selectUI = (state: State) => state.ui;

export const selectViewHeight = createSelector(selectUI, ({ viewHeight }) => viewHeight ?? 0);

export const selectPropertiesEditionHeight = createSelector(
  selectUI,
  ({ propertiesEditionHeight }) => propertiesEditionHeight,
);

export const selectEditorsHeight = createSelector(
  selectViewHeight,
  selectPropertiesEditionHeight,
  (viewHeight, propertiesEditionHeight) => viewHeight - propertiesEditionHeight,
);

export const selectPropertiesEditionVisible = (state: State) => {
  return state.ui.propertiesEditionVisible;
};
