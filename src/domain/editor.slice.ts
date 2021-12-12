import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const editorSlice = createSlice({
  name: 'editor',
  initialState: { ready: false },
  reducers: {
    setEditorReady(state, action: PayloadAction<boolean>) {
      state.ready = action.payload;
    },
  },
});

export const { setEditorReady } = editorSlice.actions;
export const editorReducer = editorSlice.reducer;
