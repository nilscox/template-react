import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PlayedStepData } from '../../../domain/Replay';

export type ReplayState = {
  steps: PlayedStepData[];
  currentStepIndex: number;
};

const initialState: ReplayState = {
  steps: [],
  currentStepIndex: 0,
};

const replaySlice = createSlice({
  name: 'replay',
  initialState,
  reducers: {
    setReplay(_state, action: PayloadAction<ReplayState>) {
      return action.payload;
    },
    addStep(state, { payload: { index, step } }: PayloadAction<{ index: number; step: PlayedStepData }>) {
      state.steps.splice(index, 0, step);
    },
    setSteps(state, { payload: steps }: PayloadAction<PlayedStepData[]>) {
      state.steps = steps;
    },
    setStepName(state, { payload: { index, name } }: PayloadAction<{ index: number; name: string }>) {
      state.steps[index].name = name;
    },
    updateSteps(state, { payload: steps }: PayloadAction<Array<PlayedStepData>>) {
      console.log('updateSteps', steps);
    },
    setCurrentStepIndex(state, action: PayloadAction<number>) {
      state.currentStepIndex = action.payload;
    },
  },
});

export const { setReplay, addStep, setSteps, setStepName, updateSteps, setCurrentStepIndex } = replaySlice.actions;
export const replayReducer = replaySlice.reducer;
