import { AnyAction, configureStore, ThunkAction as ReduxThunkAction } from '@reduxjs/toolkit';

import { Editors } from '../Editor';
import { Scheduler } from '../Scheduler';

import { editorReducer } from './slices/editor.slice';
import { replayReducer } from './slices/replay.slice';
import { uiReducer } from './slices/ui.slice';

export type Dependencies = typeof dependencies;

const scheduler = new Scheduler();
const editors = new Editors(scheduler);

const dependencies = {
  editors,
  scheduler,
};

export const store = configureStore({
  reducer: {
    replay: replayReducer,
    editor: editorReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: dependencies,
      },
    }),
});

export type GetState = typeof store.getState;
export type State = ReturnType<GetState>;

export type Dispatch = typeof store.dispatch;

export type ThunkAction<ReturnType = void> = ReduxThunkAction<ReturnType, State, Dependencies, AnyAction>;
