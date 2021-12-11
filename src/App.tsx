import { Replay } from './Replay';
import { ReplayEditor } from './ReplayEditor';
import { testReplay } from './test';

const replay = testReplay();

export const App: React.FC = () => {
  // const replay = useSelector((state: Replay) => state);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: 'setReplay',
  //     replay,
  //   });
  // }, [dispatch]);

  // if (!replay) {
  //   return null;
  // }

  return (
    <>
      <ReplayEditor replay={replay} />
      <ReplayTimeline replay={replay} />
      <ReplayProperties replay={replay} />
    </>
  );
};

const ReplayTimeline: React.FC<{ replay: Replay }> = ({ replay }) => {
  const progress = 0.4;

  return (
    <div className="bg-dark border-y border-light relative h-[28px]">
      <div className="h-full bg-light absolute" style={{ width: progress * 100 + '%' }} />
    </div>
  );
};

const ReplayProperties: React.FC<{ replay: Replay }> = ({ replay }) => {
  return (
    <div className="h-[400px] bg-dark flex flex-row">
      <div className="flex-grow border-r-2 border-light">
        <ActionsList replay={replay} />
      </div>
      <div className="flex-3"></div>
    </div>
  );
};

const ActionsList: React.FC<{ replay: Replay }> = () => {
  return (
    <ul className="max-h-full overflow-auto margin-0">
      {replay.actions.map((action, n) => (
        <li key={n}>{action.type}</li>
      ))}
    </ul>
  );
};
