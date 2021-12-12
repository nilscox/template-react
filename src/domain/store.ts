import { configureStore, ThunkAction as ReduxThunkAction } from '@reduxjs/toolkit';

import { Editor } from '../Editor';
import { Scheduler } from '../Scheduler';

import { editorReducer } from './editor.slice';
import { ReplayAction, replayReducer } from './replay.slice';
import { uiReducer } from './ui.slice';

type Dependencies = {
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

export type ThunkAction<ReturnType = void> = ReduxThunkAction<ReturnType, State, Dependencies, ReplayAction>;

export type AsyncThunk = { dispatch: Dispatch; state: State; extra: Dependencies };
