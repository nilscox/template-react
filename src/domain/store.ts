import { configureStore, Reducer, ThunkAction as ReduxThunkAction } from '@reduxjs/toolkit';

import { Editor } from '../Editor';

import { ReplayAction, replayReducer } from './replay.slice';
import { Scheduler } from './Scheduler';

type Dependencies = {
  editor: Editor;
  scheduler: Scheduler;
};

const dependencies: Dependencies = {
  editor: null as never,
  scheduler: new Scheduler(),
};

const editorReducer: Reducer<{ ready: boolean }> = (state = { ready: false }, action) => {
  if (action.type === 'setEditorReady') {
    return { ready: action.ready };
  }

  return state;
};

export const selectIsEditorReady = (state: State) => {
  return state.editor.ready;
};

export const store = configureStore({
  reducer: {
    replay: replayReducer,
    editor: editorReducer,
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
