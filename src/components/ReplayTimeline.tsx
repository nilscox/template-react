import { useReplay } from '../App';

export const ReplayTimeline: React.FC = () => {
  const replay = useReplay();

  return (
    <div className="bg-dark border-y border-light relative h-[28px]">
      <div className="h-full bg-light absolute" style={{ width: replay.progress * 100 + '%' }} />
    </div>
  );
};
