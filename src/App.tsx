/** @jsx jsx */
import { Fragment } from 'react';

import { jsx } from '@emotion/react';

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
    <Fragment>
      <ReplayEditor replay={replay} />
      <ReplayTimeline replay={replay} />
      <ReplayProperties replay={replay} />
    </Fragment>
  );
};

const ReplayTimeline: React.FC<{ replay: Replay }> = ({ replay }) => {
  const progress = 0.4;

  return (
    <Fragment>
      <div
        css={{
          height: 28,
          background: '#333',
          borderTop: '1px solid #666',
          borderBottom: '1px solid #666',
          position: 'relative',
        }}
      >
        <div
          css={{
            height: '100%',
            background: '#666',
            position: 'absolute',
            width: progress * 100 + '%',
          }}
        />
      </div>
    </Fragment>
  );
};

const ReplayProperties: React.FC<{ replay: Replay }> = ({ replay }) => {
  return (
    <Fragment>
      <div css={{ height: 400, background: '#222', display: 'flex', flexDirection: 'row' }}>
        <div css={{ flex: 1, borderRight: '2px solid #666' }}>
          <ActionsList replay={replay} />
        </div>
        <div css={{ flex: 3 }}></div>
      </div>
    </Fragment>
  );
};

const ActionsList: React.FC<{ replay: Replay }> = () => {
  return (
    <ul css={{ maxHeight: '100%', overflow: 'auto', margin: 0 }}>
      {replay.actions.map((action, n) => (
        <li key={n}>{action.type}</li>
      ))}
    </ul>
  );
};
