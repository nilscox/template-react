import { AnyAction, configureStore, ThunkAction as ReduxThunkAction } from '@reduxjs/toolkit';

import { Editor } from '../Editor';
import { Scheduler } from '../Scheduler';

import { editorReducer } from './slices/editor.slice';
import { replayReducer } from './slices/replay.slice';
import { uiReducer } from './slices/ui.slice';

export type Dependencies = {
  editor: Editor;
  scheduler: Scheduler;
};

const dependencies: Dependencies = {
  editor: null as never,
  scheduler: new Scheduler(),
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
