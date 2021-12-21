import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PlayedCommitData, PlayedStepData } from '../../../domain/types';

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
    setReplay(_state, action: PayloadAction<ReplayState>) {
      return action.payload;
    },
    addCommit(state, { payload: commit }: PayloadAction<PlayedCommitData>) {
      state.commits.push(commit);
    },
    setCommits(state, { payload: commits }: PayloadAction<PlayedCommitData[]>) {
      state.commits = commits;
    },
    setCurrentCommitName(state, { payload: name }: PayloadAction<string>) {
      state.commits[state.currentCommitIndex].name = name;
    },
    addStep(state, { payload: { commitIndex, step } }: PayloadAction<{ commitIndex: number; step: PlayedStepData }>) {
      state.commits[commitIndex].steps.push(step);
    },
    setSteps(
      state,
      { payload: { commitIndex, steps } }: PayloadAction<{ commitIndex: number; steps: PlayedStepData[] }>,
    ) {
      state.commits[commitIndex].steps = steps;
    },
    setStepName(
      state,
      {
        payload: { commitIndex, stepIndex, name },
      }: PayloadAction<{ commitIndex: number; stepIndex: number; name: string }>,
    ) {
      state.commits[commitIndex].steps[stepIndex].name = name;
    },
    updateSteps(state, { payload: steps }: PayloadAction<Array<PlayedStepData>>) {
      console.log('updateSteps', steps);
    },
    setCurrentCommitIndex(state, action: PayloadAction<number>) {
      state.currentCommitIndex = action.payload;
    },
    setCurrentStepIndex(state, action: PayloadAction<number>) {
      state.currentStepIndex = action.payload;
    },
  },
});

export const {
  setReplay,
  addCommit,
  setCommits,
  setCurrentCommitName,
  addStep,
  setSteps,
  setStepName,
  updateSteps,
  setCurrentCommitIndex,
  setCurrentStepIndex,
} = replaySlice.actions;

export const replayReducer = replaySlice.reducer;
