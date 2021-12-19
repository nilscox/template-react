import { createSelector } from '@reduxjs/toolkit';

import { State } from '../store';

export const selectRenderer = (state: State) => {
  return state.renderer;
};

export const selectEditor = (state: State) => {
  return state.editor;
};

export const selectIsTextEditorReady = createSelector(selectRenderer, ({ textEditorReady }) => textEditorReady);
export const selectIsDiffEditorReady = createSelector(selectEditor, ({ diffEditorReady }) => diffEditorReady);

export const selectAreEditorsReady = createSelector(
  selectIsTextEditorReady,
  selectIsDiffEditorReady,
  (isTextEditorReady, isDiffEditorReady) => isTextEditorReady && isDiffEditorReady,
);

export const selectDraftStep = createSelector(selectEditor, ({ draftStep }) => draftStep);
