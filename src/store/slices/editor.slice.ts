import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DraftPosition = {
  line: string;
  column: string;
};

export type DraftTypeCodeAction = {
  type: 'TypeCode';
  position: DraftPosition;
  code: string;
  prepare: {
    insertLinesAbove: string;
    insertLinesBelow: string;
  };
};

export type DraftEraseCodeAction = {
  type: 'EraseCode';
  start: DraftPosition;
  end: DraftPosition;
};

export type DraftAction = DraftTypeCodeAction | DraftEraseCodeAction;

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
    setDraftAction(state, { payload: action }: PayloadAction<DraftAction | undefined>) {
      state.draftAction = action;
    },
    updateDraftAction(state, { payload: { path, value } }: PayloadAction<{ path: string; value: string }>) {
      /* eslint-disable */

      const obj = path
        .split('.')
        .slice(0, -1)
        .reduce((state, key) => state[key], state.draftAction as any);

      obj[path.split('.').slice(-1)[0]] = value;

      /* eslint-enable */
    },
  },
});

export const { diffEditorReady, setDraftAction, updateDraftAction } = editorSlice.actions;
export const editorReducer = editorSlice.reducer;
