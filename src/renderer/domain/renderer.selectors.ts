import { createSelector } from '@reduxjs/toolkit';

import { State } from '../../store/store';

export const selectRenderer = (state: State) => {
  return state.renderer;
};

export const selectIsTextEditorReady = createSelector(selectRenderer, ({ textEditorReady }) => textEditorReady);
