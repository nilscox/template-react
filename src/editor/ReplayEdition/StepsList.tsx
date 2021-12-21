import { ReactNode } from 'react';

import { createSelector } from '@reduxjs/toolkit';
import cx from 'classnames';
import { useDispatch } from 'react-redux';

import { PlayedStepData, TypeCodeActionData } from '../../../domain/types';
import { useSelector } from '../../App';
import { selectCurrentCommit, selectCurrentStepIndex } from '../../store/slices/replay.selectors';
import { setCurrentCommitName } from '../../store/slices/replay.slice';
import { addStep } from '../domain/usecases/addStep';
import { moveCursorToInitialPosition } from '../domain/usecases/moveCursorToInitialPosition';
import { setCurrentStep } from '../domain/usecases/setCurrentStep';

import { AddItemButton, List, ListHeader, ListItem } from './List';

export const selectStepsVM = createSelector(selectCurrentCommit, selectCurrentStepIndex, (commit, currentStepIndex) => {
  if (!commit) {
    return [];
  }

  return commit.steps.map((step, n) => ({
    ...step,
    step,
    name: step.name || <>&nbsp;</>,
    isCurrent: n === currentStepIndex,
    isPlayed: n <= currentStepIndex,
    summary: (step.actions.find((action) => action.type === 'TypeCode') as TypeCodeActionData)?.code ?? '',
  }));
});

export const StepsList: React.FC = () => {
  const dispatch = useDispatch();
  const steps = useSelector(selectStepsVM);

  return (
    <List
      header={<StepsListHeader />}
      addItem={<AddItemButton onClick={() => dispatch(addStep())}>Add step</AddItemButton>}
    >
      {steps.map((step, n) => (
        <StepsListItem key={n} index={n} {...step} />
      ))}
    </List>
  );
};

const StepsListHeader: React.FC = () => {
  const dispatch = useDispatch();
  const currentCommit = useSelector(selectCurrentCommit);

  return (
    <ListHeader>
      <input
        className="bg-transparent"
        placeholder="Commit name..."
        value={currentCommit?.name ?? ''}
        onChange={(e) => dispatch(setCurrentCommitName(e.target.value))}
      />
    </ListHeader>
  );
};

type StepListItemProps = {
  index: number;
  step: PlayedStepData;
  name: ReactNode;
  summary: string;
  isCurrent: boolean;
  isPlayed: boolean;
};

const StepsListItem: React.FC<StepListItemProps> = ({ step, name, summary, isCurrent, isPlayed }) => {
  const dispatch = useDispatch();

  const handleStepClick = (step: PlayedStepData) => () => {
    dispatch(setCurrentStep(step));
    dispatch(moveCursorToInitialPosition());
  };

  return (
    <ListItem
      role="button"
      className={cx(isCurrent && '!bg-dark-alternate cursor-default text-xl', !isPlayed && 'text-muted')}
      onClick={handleStepClick(step)}
    >
      <div className="flex-grow overflow-x-hidden">
        <div>{name}</div>
        <div className="overflow-hidden text-xs text-muted whitespace-nowrap text-ellipsis">{summary}</div>
      </div>
      {isCurrent && <div className="text-3xl text-muted">{'➜'}</div>}
    </ListItem>
  );
};
