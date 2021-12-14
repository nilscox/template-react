import { createSlice } from '@reduxjs/toolkit';

type EditorState = {
  textEditorReady: boolean;
  diffEditorReady: boolean;
};

const initialState: EditorState = {
  diffEditorReady: false,
  textEditorReady: false,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    diffEditorReady(state) {
      state.textEditorReady = true;
    },
    editorReady(state) {
      state.diffEditorReady = true;
    },
  },
});

export const { editorReady, diffEditorReady } = editorSlice.actions;
export const editorReducer = editorSlice.reducer;
