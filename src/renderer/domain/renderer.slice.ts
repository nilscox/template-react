import { createSlice } from '@reduxjs/toolkit';

type EditorState = {
  textEditorReady: boolean;
};

const initialState: EditorState = {
  textEditorReady: false,
};

const editorSlice = createSlice({
  name: 'renderer',
  initialState,
  reducers: {
    textEditorReady(state) {
      state.textEditorReady = true;
    },
  },
});

export const { textEditorReady } = editorSlice.actions;
export const rendererReducer = editorSlice.reducer;
