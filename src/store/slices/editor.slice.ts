import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DraftPosition = {
  line: string;
  column: string;
};

export type DraftMoveCursorAction = {
  type: 'MoveCursor';
  position: DraftPosition;
};

export type DraftInsertLinesAction = {
  type: 'InsertLines';
  above: string;
  below: string;
};

export type DraftTypeCodeAction = {
  type: 'TypeCode';
  code: string;
};

export type DraftEraseCodeAction = {
  type: 'EraseCode';
  end: DraftPosition;
};

export type DraftAction = DraftMoveCursorAction | DraftInsertLinesAction | DraftTypeCodeAction | DraftEraseCodeAction;

export type DraftStep = {
  actions: DraftAction[];
};

type EditorState = {
  diffEditorReady: boolean;
  draftStep?: DraftStep;
};

const initialState: EditorState = {
  diffEditorReady: false,
  draftStep: undefined,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    diffEditorReady(state) {
      state.diffEditorReady = true;
    },
    setDraftStep(state, { payload: step }: PayloadAction<DraftStep | undefined>) {
      state.draftStep = step;
    },
    updateDraftStep(state, { payload: { path, value } }: PayloadAction<{ path: string; value: string }>) {
      /* eslint-disable */

      const obj = path
        .split('.')
        .slice(0, -1)
        .reduce((state, key) => state[key], state.draftStep as any);

      obj[path.split('.').slice(-1)[0]] = value;

      /* eslint-enable */
    },
  },
});

export const { diffEditorReady, setDraftStep, updateDraftStep } = editorSlice.actions;
export const editorReducer = editorSlice.reducer;
