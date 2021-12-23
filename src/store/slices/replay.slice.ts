import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Replay } from '../../../domain/Replay';
import { PlayedCommitData, PlayedStepData, ReplayCommitData } from '../../../domain/types';

export type ReplayState = {
  commits: PlayedCommitData[];
  currentCommitIndex: number;
  currentStepIndex: number;
};

const initialState: ReplayState = {
  commits: [],
  currentCommitIndex: 0,
  currentStepIndex: 0,
};

const replaySlice = createSlice({
  name: 'replay',
  initialState,
  reducers: {
    loadReplay(state, { payload: commits }: PayloadAction<ReplayCommitData[]>) {
      const replay = Replay.load(commits);

      state.commits = replay.data.commits;
    },
    addCommit(state) {
      const replay = Replay.create(state.commits);

      replay.addCommit();
    },
    addStep(state) {
      const replay = Replay.create(state.commits);

      replay.commits[state.currentCommitIndex].addStep();
    },
    setCurrentCommitName(state, { payload: name }: PayloadAction<string>) {
      state.commits[state.currentCommitIndex].name = name;
    },
    setSteps(
      state,
      { payload: { commitIndex, steps } }: PayloadAction<{ commitIndex: number; steps: PlayedStepData[] }>,
    ) {
      state.commits[commitIndex].steps = steps;
    },
    setCurrentStepName(state, { payload: name }: PayloadAction<string>) {
      const { currentCommitIndex, currentStepIndex } = state;

      state.commits[currentCommitIndex].steps[currentStepIndex].name = name;
    },
    setCurrentCommitIndex(state, { payload: index }: PayloadAction<number>) {
      state.currentCommitIndex = index;
    },
    setCurrentStepIndex(state, { payload: index }: PayloadAction<number>) {
      state.currentStepIndex = index;
    },
  },
});

export const {
  loadReplay,
  addCommit,
  addStep,
  setCurrentCommitName,
  setSteps,
  setCurrentStepName,
  setCurrentCommitIndex,
  setCurrentStepIndex,
} = replaySlice.actions;

export const replayReducer = replaySlice.reducer;
