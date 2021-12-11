import { configureStore } from '@reduxjs/toolkit';

import { Editor } from '../Editor';

import { replayReducer } from './replay.slice';

const dependencies = {
  editor: Editor,
};

export const store = configureStore({
  reducer: {
    replay: replayReducer,
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
