import cx from 'classnames';

import { TypeCode } from '../actions/TypeCode';
import { useReplay } from '../App';

import { TypeCodeEdition } from './actions/TypeCodeEdition';

export const ReplayProperties: React.FC = () => {
  const replay = useReplay();

  return (
    <div className="flex flex-row h-[400px] bg-dark">
      <div className="flex-grow border-r-2 border-light">
        <ActionsList />
      </div>
      <div className="flex-3">
        <TypeCodeEdition typeCode={replay.actions[4] as TypeCode} />
      </div>
    </div>
  );
};

export const ActionsList: React.FC = () => {
  const replay = useReplay();

  return (
    <ul className="flex flex-col max-h-full overflow-auto margin-0 bg-dark-alternate gap-[2px]">
      {replay.actions.map((action, n) => (
        <li
          key={n}
          role="button"
          className={cx(
            'flex flex-row items-center py-2 px-4 bg-dark hover:bg-dark-alternate transition-colors',
            n === 4 && '!bg-dark-alternate cursor-default text-xl',
            n > 4 && 'text-muted',
          )}
        >
          <div className="flex-grow">{action.type}</div>
          {n === 4 && <div className="text-3xl text-muted">{'➜'}</div>}
        </li>
      ))}
    </ul>
  );
};
