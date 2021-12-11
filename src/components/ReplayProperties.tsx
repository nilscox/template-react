import { createSelector } from '@reduxjs/toolkit';
import cx from 'classnames';
import { useDispatch } from 'react-redux';

import { useCurrentAction, useSelector } from '../App';
import { ReplayAction, selectReplay, setCurrentActionIndex } from '../domain/replay.slice';

import { AddSelectionsEdition } from './actions/AddSelectionsEdition';
import { DeleteSelectionEdition } from './actions/DeleteSelectionEdition';
import { EraseCodeEdition } from './actions/EraseCodeEdition';
import { TypeCodeEdition } from './actions/TypeCodeEdition';

export const ReplayProperties: React.FC = () => {
  const action = useCurrentAction();

  return (
    <div className="flex flex-row h-[400px] bg-dark">
      <div className="flex-grow border-r-2 border-light">
        <ActionsList />
      </div>
      <div className="flex-3">{action && <ReplayActionEdition action={action} />}</div>
    </div>
  );
};

type ReplayActionEditionProps = {
  action: ReplayAction;
};

const ReplayActionEdition: React.FC<ReplayActionEditionProps> = ({ action }) => {
  switch (action.type) {
    case 'TypeCode':
      return <TypeCodeEdition typeCode={action} />;

    case 'EraseCode':
      return <EraseCodeEdition eraseCode={action} />;

    case 'AddSelections':
      return <AddSelectionsEdition addSelections={action} />;

    case 'DeleteSelection':
      return <DeleteSelectionEdition deleteSelection={action} />;

    default:
      return null;
  }
};

const selectActionsVM = createSelector(selectReplay, (replay) => {
  return replay.actions.map((action, n) => ({
    ...action,
    isCurrent: n === replay.currentActionIndex,
    isPlayed: n <= replay.currentActionIndex,
  }));
});

export const ActionsList: React.FC = () => {
  const dispatch = useDispatch();
  const actions = useSelector(selectActionsVM);

  return (
    <ul className="flex flex-col max-h-full overflow-auto margin-0 bg-dark-alternate gap-[2px]">
      {actions.map((action, n) => (
        <li
          key={n}
          role="button"
          className={cx(
            'flex flex-row items-center py-2 px-4 bg-dark hover:bg-dark-alternate transition-colors',
            action.isCurrent && '!bg-dark-alternate cursor-default text-xl',
            !action.isPlayed && 'text-muted',
          )}
          onClick={() => dispatch(setCurrentActionIndex(n))}
        >
          <div className="flex-grow">{action.type}</div>
          {action.isCurrent && <div className="text-3xl text-muted">{'➜'}</div>}
        </li>
      ))}
    </ul>
  );
};
