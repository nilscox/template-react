import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DraftAction } from '../types/entities';

type EditorState = {
  diffEditorReady: boolean;
  draftAction?: DraftAction;
};

const initialState: EditorState = {
  diffEditorReady: false,
  draftAction: undefined,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    diffEditorReady(state) {
      state.diffEditorReady = true;
    },
    setDraftAction(state, { payload: action }: PayloadAction<DraftAction>) {
      state.draftAction = action;
    },
    updateDraftAction(state, { payload: { path, value } }: PayloadAction<{ path: string; value: string }>) {
      const obj = path
        .split('.')
        .slice(0, -1)
        .reduce((state, key) => state[key], state.draftAction as any);

      obj[path.split('.').slice(-1)[0]] = value;
    },
  },
});

export const { diffEditorReady, setDraftAction, updateDraftAction } = editorSlice.actions;
export const editorReducer = editorSlice.reducer;
