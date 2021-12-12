import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReplayAction } from '../types/actions';

export type Replay = {
  actions: ReplayAction[];
  currentActionIndex: number;
};

const initialState: Replay = {
  actions: [],
  currentActionIndex: 0,
};

const replaySlice = createSlice({
  name: 'replay',
  initialState,
  reducers: {
    setReplay(_state, action: PayloadAction<Replay>) {
      return action.payload;
    },
    addAction(state, action: PayloadAction<ReplayAction>) {
      state.actions.push(action.payload);
    },
    setCurrentActionIndex(state, action: PayloadAction<number>) {
      state.currentActionIndex = action.payload;
    },
  },
});

export const { setReplay, addAction, setCurrentActionIndex } = replaySlice.actions;
export const replayReducer = replaySlice.reducer;
