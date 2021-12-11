import { useReplay } from '../App';

export const ReplayTimeline: React.FC = () => {
  const replay = useReplay();

  return (
    <div className="relative bg-dark border-y border-light h-[28px]">
      <div className="absolute h-full bg-light" style={{ width: replay.progress * 100 + '%' }} />
    </div>
  );
};
