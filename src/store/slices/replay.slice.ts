import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PlayedActionData } from '../../../domain/Replay';

export type ReplayState = {
  actions: PlayedActionData[];
  currentActionIndex: number;
};

const initialState: ReplayState = {
  actions: [],
  currentActionIndex: 0,
};

const replaySlice = createSlice({
  name: 'replay',
  initialState,
  reducers: {
    setReplay(_state, action: PayloadAction<ReplayState>) {
      return action.payload;
    },
    setActions(state, action: PayloadAction<PlayedActionData[]>) {
      state.actions = action.payload;
    },
    addAction(state, action: PayloadAction<PlayedActionData>) {
      state.actions.push(action.payload);
    },
    updateCurrentAction(state, { payload: action }: PayloadAction<PlayedActionData>) {
      state.actions[state.currentActionIndex] = action;
    },
    updateActions(state, { payload: actions }: PayloadAction<Array<PlayedActionData>>) {
      console.log('updateActions', actions);
    },
    setCurrentActionIndex(state, action: PayloadAction<number>) {
      state.currentActionIndex = action.payload;
    },
  },
});

export const { setReplay, setActions, addAction, updateCurrentAction, updateActions, setCurrentActionIndex } =
  replaySlice.actions;
export const replayReducer = replaySlice.reducer;
