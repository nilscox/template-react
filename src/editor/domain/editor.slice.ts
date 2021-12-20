import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActionType } from '../../../domain/Replay';

export type DraftPosition = {
  line: string;
  column: string;
};

export type DraftMoveCursorAction = {
  type: ActionType.MoveCursor;
  position: DraftPosition;
};

export type DraftInsertLinesAction = {
  type: ActionType.InsertLines;
  above: string;
  below: string;
};

export type DraftTypeCodeAction = {
  type: ActionType.TypeCode;
  code: string;
};

export type DraftEraseCodeAction = {
  type: ActionType.EraseCode;
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
    addDraftAction(state, { payload: action }: PayloadAction<DraftAction>) {
      state.draftStep?.actions.push(action);
    },
    removeDraftAction(state, { payload: index }: PayloadAction<number>) {
      state.draftStep?.actions.splice(index, 1);
    },
  },
});

export const { diffEditorReady, setDraftStep, updateDraftStep, addDraftAction, removeDraftAction } =
  editorSlice.actions;

export const editorReducer = editorSlice.reducer;
