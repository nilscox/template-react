import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Replay as ReplayClass } from './reducers/Replay';

export type TypeCodeAction = {
  type: 'TypeCode';
  code: string;
};

export type ReplayAction = TypeCodeAction;

export type CursorPosition = [number, number];

export type EditorState = {
  code: string;
  position: CursorPosition;
};

export type Step = {
  name: string;
  actions: ReplayAction[];
  initialState: EditorState;
  finalState: EditorState;
};

export type Commit = {
  name: string;
  steps: Step[];
};

export type Replay = {
  commits: Commit[];
};

export type StepData = Omit<Step, 'initialState' | 'finalState'>;
export type CommitData = Omit<Commit, 'steps'> & { steps: StepData[] };
export type ReplayData = Omit<Replay, 'commits'> & { commits: CommitData[] };

const initialState: Replay = {
  commits: [],
};

const replaySlice = createSlice({
  name: 'replay',
  initialState,
  reducers: {
    loadReplay(_, { payload: data }: PayloadAction<ReplayData>) {
      return ReplayClass.load(data).props;
    },
    addCommit(state, { payload: data }: PayloadAction<CommitData>) {
      new ReplayClass(state).addCommit(data);
    },
  },
});

export const replayReducer = replaySlice.reducer;

export const { loadReplay, addCommit } = replaySlice.actions;
