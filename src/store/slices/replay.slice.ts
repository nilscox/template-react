import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReplayAction } from '../types/entities';

export type ReplayActionState = ReplayAction & {
  id: string;
  codeBefore: string;
  codeAfter: string;
};

export type ReplayState = {
  actions: ReplayActionState[];
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
    addAction(state, action: PayloadAction<ReplayActionState>) {
      state.actions.push(action.payload);
    },
    replaceAction(state, { payload: { id, action } }: PayloadAction<{ id: string; action: ReplayActionState }>) {
      const index = state.actions.findIndex((action) => action.id === id);

      if (index >= 0) {
        state.actions[index] = action;
      }
    },
    setCurrentActionIndex(state, action: PayloadAction<number>) {
      state.currentActionIndex = action.payload;
    },
  },
});

export const { setReplay, addAction, replaceAction, setCurrentActionIndex } = replaySlice.actions;
export const replayReducer = replaySlice.reducer;
