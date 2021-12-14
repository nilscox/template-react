import { createSelector } from '@reduxjs/toolkit';
import cx from 'classnames';
import { useDispatch } from 'react-redux';

import { useSelector } from '../App';
import { selectDraftAction } from '../domain/slices/editor.selectors';
import { selectCurrentAction, selectReplay } from '../domain/slices/replay.selectors';
import { selectPropertiesEditionVisible } from '../domain/slices/ui.selectors';
import { DraftEraseCodeAction, DraftTypeCodeAction, ReplayAction } from '../domain/types/entities';
import { setCurrentAction } from '../domain/usecases/setCurrentAction';

import { EraseCodeEdition } from './actions/EraseCodeEdition';
import { TypeCodeEdition } from './actions/TypeCodeEdition';

export const ReplayProperties: React.FC = () => {
  const action = useSelector(selectCurrentAction);
  const visible = useSelector(selectPropertiesEditionVisible);

  if (!visible) {
    return null;
  }

  return (
    <div className="flex flex-row h-[400px] bg-dark">
      <div className="border-r-2 min-w-sm border-light">
        <ActionsList />
      </div>
      <div className="flex-grow">{action && <ReplayActionEdition action={action} />}</div>
    </div>
  );
};

type ReplayActionEditionProps = {
  action: ReplayAction;
};

const ReplayActionEdition: React.FC<ReplayActionEditionProps> = () => {
  const currentAction = useSelector(selectCurrentAction);
  const draftAction = useSelector(selectDraftAction);

  if (!draftAction) {
    return null;
  }

  switch (currentAction.type) {
    case 'TypeCode':
      return <TypeCodeEdition action={draftAction as DraftTypeCodeAction} />;

    case 'EraseCode':
      return <EraseCodeEdition action={draftAction as DraftEraseCodeAction} />;

    default:
      return null;
  }
};

const selectActionsVM = createSelector(selectReplay, (replay) => {
  return replay.actions.map((action, n) => ({
    ...action,
    isCurrent: n === replay.currentActionIndex,
    isPlayed: n <= replay.currentActionIndex,
    summary: action.type === 'TypeCode' ? action.code : '',
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
          onClick={() => dispatch(setCurrentAction(action.id))}
        >
          <div className="flex-grow">
            <div className="inline-block w-[120px]">{action.type}</div>
            <code className="text-xs text-muted">{action.summary}</code>
          </div>
          {action.isCurrent && <div className="text-3xl text-muted">{'➜'}</div>}
        </li>
      ))}
    </ul>
  );
};
