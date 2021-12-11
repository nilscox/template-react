import { useEffect } from 'react';

import { Selector } from '@reduxjs/toolkit';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';

import { ReplayEditor } from './components/ReplayEditor';
import { ReplayProperties } from './components/ReplayProperties';
import { ReplayTimeline } from './components/ReplayTimeline';
import { selectCurrentAction, selectReplay, setReplay } from './domain/replay.slice';
import { Replay } from './domain/replay.slice';
import { State } from './domain/store';
import replay from './replay.json';

export const useSelector = <Result, Params extends unknown[]>(
  selector: Selector<State, Result, Params>,
  ...params: Params
) => {
  return useReduxSelector((state: State) => selector(state, ...params));
};

export const useReplay = () => {
  return useSelector(selectReplay);
};

export const useCurrentAction = () => {
  return useSelector(selectCurrentAction);
};

export const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setReplay(replay as Replay));
  }, [dispatch]);

  return (
    <>
      <ReplayEditor />
      <ReplayTimeline />
      <ReplayProperties />
    </>
  );
};
