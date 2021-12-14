import { useEffect } from 'react';

import { Selector } from '@reduxjs/toolkit';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';

import { ReplayEditor } from './components/ReplayEditor';
import { ReplayProperties } from './components/ReplayProperties';
import { ReplayRenderer } from './components/ReplayRenderer';
import { ReplayTimeline } from './components/ReplayTimeline';
import { selectAreEditorsReady } from './domain/slices/editor.selectors';
import { State } from './domain/store';
import { loadReplay, ReplayDto } from './domain/usecases/loadReplay';
import replay from './replay_.json';

export const useSelector = <Result, Params extends unknown[]>(
  selector: Selector<State, Result, Params>,
  ...params: Params
) => {
  return useReduxSelector((state: State) => selector(state, ...params));
};

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const areEditorsReady = useSelector(selectAreEditorsReady);

  useEffect(() => {
    if (areEditorsReady) {
      dispatch(loadReplay(replay as ReplayDto));
    }
  }, [dispatch, areEditorsReady]);

  return (
    <div className="flex flex-col flex-grow h-full max-h-full overflow-hidden">
      <div className="flex flex-row flex-grow">
        <div className="w-1/2">
          <ReplayEditor />
        </div>
        <div className="w-1/2">
          <ReplayRenderer />
        </div>
      </div>

      <ReplayProperties />
    </div>
  );
};
