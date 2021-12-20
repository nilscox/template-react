import { createSelector } from '@reduxjs/toolkit';

import { State } from '../../store/store';

export const selectEditor = (state: State) => {
  return state.editor;
};

export const selectIsDiffEditorReady = createSelector(selectEditor, ({ diffEditorReady }) => diffEditorReady);

export const selectDraftStep = createSelector(selectEditor, ({ draftStep }) => draftStep);
