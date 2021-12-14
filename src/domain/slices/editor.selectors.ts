import { createSelector } from '@reduxjs/toolkit';

import { State } from '../store';

export const selectEditor = (state: State) => {
  return state.editor;
};

export const selectIsTextEditorReady = createSelector(selectEditor, ({ textEditorReady }) => textEditorReady);
export const selectIsDiffEditorReady = createSelector(selectEditor, ({ diffEditorReady }) => diffEditorReady);

export const selectAreEditorsReady = createSelector(
  selectIsTextEditorReady,
  selectIsDiffEditorReady,
  (isTextEditorReady, isDiffEditorReady) => isTextEditorReady && isDiffEditorReady,
);
