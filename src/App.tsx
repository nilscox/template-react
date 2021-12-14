import { useEffect } from 'react';

import { Selector } from '@reduxjs/toolkit';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';

import { ReplayEditor } from './components/ReplayEditor';
import { ReplayProperties } from './components/ReplayProperties';
import { ReplayTimeline } from './components/ReplayTimeline';
import { selectIsEditorReady } from './domain/slices/editor.selectors';
import { State } from './domain/store';
import { loadReplay, ReplayDto } from './domain/usecases/loadReplay';
import replay from './replay.json';

export const useSelector = <Result, Params extends unknown[]>(
  selector: Selector<State, Result, Params>,
  ...params: Params
) => {
  return useReduxSelector((state: State) => selector(state, ...params));
};

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const isEditorReady = useSelector(selectIsEditorReady);

  useEffect(() => {
    if (isEditorReady) {
      dispatch(loadReplay(replay as ReplayDto));
    }
  }, [dispatch, isEditorReady]);

  return (
    <>
      <ReplayEditor />
      <ReplayTimeline />
      <ReplayProperties />
    </>
  );
};
