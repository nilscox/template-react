import { AnyAction, configureStore, ThunkAction as ReduxThunkAction } from '@reduxjs/toolkit';

import { Editors } from '../Editor';
import { editorReducer } from '../editor/domain/editor.slice';
import { rendererReducer } from '../renderer/domain/renderer.slice';
import { replayReducer } from '../replay/replay.slice';
import { Scheduler } from '../Scheduler';

import { uiReducer } from './slices/ui.slice';

export type Dependencies = typeof dependencies;

const scheduler = new Scheduler();
const editors = new Editors(scheduler);

const dependencies = {
  editors,
  scheduler,
};

export const createStore = () => {
  return configureStore({
    reducer: {
      replay: replayReducer,
      renderer: rendererReducer,
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
};

export type Store = ReturnType<typeof createStore>;

export type GetState = Store['getState'];
export type State = ReturnType<GetState>;

export type Dispatch = Store['dispatch'];

export type ThunkAction<ReturnType = void> = ReduxThunkAction<ReturnType, State, Dependencies, AnyAction>;
