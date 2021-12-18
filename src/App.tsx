import { useEffect, useRef } from 'react';

import { Selector } from '@reduxjs/toolkit';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';

import { ReplayActionData } from '../domain/Replay';

import { ReplayEditor } from './components/ReplayEditor';
import { ReplayProperties } from './components/ReplayProperties';
import { ReplayRenderer } from './components/ReplayRenderer';
import { ReplayTimeline } from './components/ReplayTimeline';
import replay from './replay_2.json';
import { selectAreEditorsReady } from './store/slices/editor.selectors';
import { selectPropertiesEditionHeight, selectViewHeight } from './store/slices/ui.selectors';
import { setPropertiesEditionHeight, setViewHeight } from './store/slices/ui.slice';
import { State } from './store/store';
import { loadReplay } from './store/usecases/loadReplay';

export const useSelector = <Result, Params extends unknown[]>(
  selector: Selector<State, Result, Params>,
  ...params: Params
) => {
  return useReduxSelector((state: State) => selector(state, ...params));
};

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const areEditorsReady = useSelector(selectAreEditorsReady);
  const viewHeight = useSelector(selectViewHeight);
  const propertiesEditionHeight = useSelector(selectPropertiesEditionHeight);

  useEffect(() => {
    if (areEditorsReady) {
      dispatch(loadReplay(replay.actions as ReplayActionData[]));
    }
  }, [dispatch, areEditorsReady]);

  const ref = useRef<HTMLHRElement>(null);

  return (
    <div
      ref={(ref) => ref && dispatch(setViewHeight(ref.clientHeight))}
      onDragOver={(e) => dispatch(setPropertiesEditionHeight(viewHeight - e.pageY + 2))}
      className="flex flex-col flex-grow h-full max-h-full overflow-hidden"
    >
      <div className="flex flex-row flex-grow">
        <div className="w-1/2">
          <ReplayEditor />
        </div>
        <div className="w-1/2">
          <ReplayRenderer />
        </div>
      </div>

      <hr ref={ref} className="border-t-4 cursor-row-resize border-light" draggable />

      <div className="border-b border-b-light">
        <ReplayTimeline />
      </div>

      <div style={{ height: propertiesEditionHeight }}>
        <ReplayProperties />
      </div>
    </div>
  );
};
