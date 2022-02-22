import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Replay } from '../../../domain/Replay';
import { PlayedCommitData, PlayedStepData, ReplayCommitData } from '../../../domain/types';
import { ActionField } from '../../editor/domain/usecases/updateDraftAction';

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

type UpdateStepActionPayload = {
  actionIndex: number;
  field: ActionField;
  value: string;
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
    tryUpdateStepAction(state, { payload }: PayloadAction<UpdateStepActionPayload>) {
      const { actionIndex, field, value } = payload;

      console.log(actionIndex, field, value);
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
  tryUpdateStepAction,
  setSteps,
  setCurrentStepName,
  setCurrentCommitIndex,
  setCurrentStepIndex,
} = replaySlice.actions;

export const replayReducer = replaySlice.reducer;
