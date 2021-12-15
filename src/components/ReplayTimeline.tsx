import { createSelector } from '@reduxjs/toolkit';

import { useSelector } from '../App';
import { selectReplay } from '../store/slices/replay.selectors';

const selectReplayProgress = createSelector(selectReplay, (replay) => {
  if (!replay.actions.length) {
    return 0;
  }

  return (replay.currentActionIndex + 1) / replay.actions.length;
});

export const ReplayTimeline: React.FC = () => {
  const progress = useSelector(selectReplayProgress);

  return (
    <div className="relative border-y bg-dark border-light min-h-[12px]">
      <div className="absolute h-full bg-light" style={{ width: `${progress * 100}%` }} />
    </div>
  );
};
