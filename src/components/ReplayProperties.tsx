import { useReplay } from '../App';

export const ReplayProperties: React.FC = () => {
  return (
    <div className="h-[400px] bg-dark flex flex-row">
      <div className="flex-grow border-r-2 border-light">
        <ActionsList />
      </div>
      <div className="flex-3"></div>
    </div>
  );
};

export const ActionsList: React.FC = () => {
  const replay = useReplay();

  return (
    <ul className="max-h-full overflow-auto margin-0">
      {replay.actions.map((action, n) => (
        <li key={n}>{action.type}</li>
      ))}
    </ul>
  );
};
