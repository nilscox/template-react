import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { ReplayEditor } from './components/ReplayEditor';
import { ReplayProperties } from './components/ReplayProperties';
import { ReplayTimeline } from './components/ReplayTimeline';
import { Replay } from './Replay';
import { testReplay } from './test';

export const useReplay = () => {
  return useSelector((state: Replay) => state);
};

export const App: React.FC = () => {
  const replay = useReplay();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'setReplay',
      replay: testReplay(),
    });
  }, [dispatch]);

  if (!replay) {
    return null;
  }

  return (
    <>
      <ReplayEditor />
      <ReplayTimeline />
      <ReplayProperties />
    </>
  );
};
