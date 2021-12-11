import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from './store';

export type Position = {
  line: number;
  column: number;
};

// cursor movement

export type SetCursorPositionAction = {
  type: 'SetCursorPosition';
  position: Position;
};

export type CursorMovementAction = SetCursorPositionAction;

// selections

export type AddSelectionsAction = {
  type: 'AddSelections';
  ranges: Array<[Position, Position]>;
};

export type DeleteSelectionAction = {
  type: 'DeleteSelection';
};

export type SelectionAction = AddSelectionsAction | DeleteSelectionAction;

// text edition

export type TypeCodeAction = {
  type: 'TypeCode';
  position: Position;
  code: string;
  prepare: {
    insertLinesAbove: number;
    insertLinesBelow: number;
  };
};

export type EraseCodeAction = {
  type: 'EraseCode';
  position: Position;
  code: string;
  prepare: {
    insertLinesAbove: number;
    insertLinesBelow: number;
  };
};

export type InsertLinesAction = {
  type: 'InsertLines';
  position: Position;
  insertLinesAbove: number;
  insertLinesBelow: number;
};

export type TextEditionAction = TypeCodeAction | EraseCodeAction | InsertLinesAction;

export type ReplayAction = CursorMovementAction | SelectionAction | TextEditionAction;

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

export const selectReplay = (state: State) => state.replay;

export const selectCurrentAction = createSelector(selectReplay, (replay) => {
  return replay.actions[replay.currentActionIndex];
});
