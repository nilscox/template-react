import { useEffect } from 'react';

import { Selector } from '@reduxjs/toolkit';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';

import { ReplayEditor } from './components/ReplayEditor';
import { ReplayProperties } from './components/ReplayProperties';
import { ReplayTimeline } from './components/ReplayTimeline';
import { selectIsEditorReady } from './domain/editor.selectors';
import { playActions } from './domain/playActions';
import { selectCurrentAction, selectReplay } from './domain/replay.selectors';
import { Replay, setReplay } from './domain/replay.slice';
import { State } from './domain/store';
import replayInput from './replay.json';

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
  const isEditorReady = useSelector(selectIsEditorReady);
  const replay = useReplay();

  useEffect(() => {
    dispatch(setReplay(replayInput as Replay));
  }, [dispatch]);

  useEffect(() => {
    if (isEditorReady) {
      dispatch(playActions(replay.actions.slice(0, replay.currentActionIndex)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditorReady]);

  return (
    <>
      <ReplayEditor />
      <ReplayTimeline />
      <ReplayProperties />
    </>
  );
};
