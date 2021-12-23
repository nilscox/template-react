import { createSelector } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { useSelector } from '../App';
import { selectReplay } from '../store/slices/replay.selectors';

import { playCurrentStep } from './domain/usecases/playCurrentStep';

const selectReplayProgress = createSelector(selectReplay, (replay) => {
  if (!replay.commits.length) {
    return 0;
  }

  return replay.currentCommitIndex / replay.commits.length;
});

export const ReplayTimeline: React.FC = () => {
  const dispatch = useDispatch();
  const progress = useSelector(selectReplayProgress);

  return (
    <div className="flex flex-row items-center p-2 bg-dark gap-4">
      <button disabled={progress === 1} onClick={() => dispatch(playCurrentStep())}>
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-muted">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <div className="relative flex-grow border rounded-full border-light min-h-[8px]">
        <div
          className="absolute h-full rounded-l-full bg-light transition-all duration-75"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};
