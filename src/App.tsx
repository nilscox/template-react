import { useEffect } from 'react';

import { createSelector, Selector } from '@reduxjs/toolkit';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';

import { ReplayStepData } from '../domain/Replay';

import { DiffEditor } from './editor/DiffEditor';
import { selectIsDiffEditorReady } from './editor/domain/editor.selectors';
import { ReplayEdition } from './editor/ReplayEdition/ReplayEdition';
import { selectIsTextEditorReady } from './renderer/domain/renderer.selectors';
import { loadReplay } from './renderer/domain/usecases/loadReplay';
import { ReplayRenderer } from './renderer/ReplayRenderer';
import { ReplayTimeline } from './renderer/ReplayTimeline';
import replay from './replay_4.json';
import { State } from './store/store';

export const useSelector = <Result, Params extends unknown[]>(
  selector: Selector<State, Result, Params>,
  ...params: Params
) => {
  return useReduxSelector((state: State) => selector(state, ...params));
};

const selectAreEditorsReady = createSelector(
  selectIsTextEditorReady,
  selectIsDiffEditorReady,
  (isTextEditorReady, isDiffEditorReady) => isTextEditorReady && isDiffEditorReady,
);

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const areEditorsReady = useSelector(selectAreEditorsReady);

  useEffect(() => {
    if (areEditorsReady) {
      // dispatch(loadReplay([]));
      dispatch(loadReplay(replay.steps as ReplayStepData[]));
    }
  }, [dispatch, areEditorsReady]);

  return (
    <div className="flex flex-col flex-grow h-full max-h-full overflow-hidden">
      <div className="flex flex-row">
        <div className="w-1/2">
          <DiffEditor />
        </div>
        <div className="w-1/2">
          <ReplayRenderer />
        </div>
      </div>

      <div className="border-y border-light">
        <ReplayTimeline />
      </div>

      <ReplayEdition />
    </div>
  );
};
