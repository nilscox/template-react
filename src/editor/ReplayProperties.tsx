import { ReactNode, useState } from 'react';

import { createSelector } from '@reduxjs/toolkit';
import cx from 'classnames';
import { useDispatch } from 'react-redux';

import { PlayedStepData, ReplayActionData, TypeCodeActionData } from '../../domain/Replay';
import { useSelector } from '../App';
import { selectCurrentStep, selectReplay } from '../store/slices/replay.selectors';
import { setStepName } from '../store/slices/replay.slice';
import { selectPropertiesEditionVisible } from '../store/slices/ui.selectors';

import { EraseCodeEdition } from './actions/EraseCodeEdition';
import { InsertLinesEdition } from './actions/InsertLinesEdition';
import { MoveCursorEdition } from './actions/MoveCursorEdition';
import { TypeCodeEdition } from './actions/TypeCodeEdition';
import { selectDraftStep } from './domain/editor.selectors';
import { DraftAction } from './domain/editor.slice';
import { addAction } from './domain/usecases/addAction';
import { addStep } from './domain/usecases/addStep';
import { moveCursorToInitialPosition } from './domain/usecases/moveCursorToInitialPosition';
import { setCurrentStep } from './domain/usecases/setCurrentStep';

export const ReplayProperties: React.FC = () => {
  const visible = useSelector(selectPropertiesEditionVisible);

  if (!visible) {
    return null;
  }

  return (
    <div className="flex flex-row flex-grow overflow-hidden bg-dark">
      <StepsList />
      <ReplayStepEdition />
    </div>
  );
};

const ReplayStepEdition: React.FC = () => {
  const dispatch = useDispatch();
  const draftStep = useSelector(selectDraftStep);
  const currentStep = useSelector(selectCurrentStep);
  const { currentStepIndex } = useSelector(selectReplay);

  if (!draftStep) {
    return null;
  }

  const handleChange = (name: string) => {
    dispatch(setStepName({ index: currentStepIndex, name }));
  };

  return (
    <div className="flex flex-col flex-grow h-full max-h-full p-4 overflow-y-auto gap-4">
      <input
        className="px-2 py-1 text-xl bg-transparent"
        value={currentStep.name}
        placeholder="Step name..."
        autoFocus={currentStep.name === ''}
        onChange={(e) => handleChange(e.target.value)}
      />

      {draftStep.actions.map((action, n) => (
        <ReplayActionEdition key={n} action={action} />
      ))}

      <AddAction key={currentStepIndex} />
    </div>
  );
};

const AddAction: React.FC = () => {
  const dispatch = useDispatch();
  const [displayActionTypeSelection, setDisplayActionTypeSelection] = useState(false);

  const types: Array<ReplayActionData['type']> = ['MoveCursor', 'InsertLines', 'TypeCode', 'EraseCode'];

  const handleAddAction = (type: ReplayActionData['type']) => () => {
    dispatch(addAction(type));
    setDisplayActionTypeSelection(false);
  };

  if (displayActionTypeSelection) {
    return (
      <div className="flex flex-col items-start gap-2">
        {types.map((type) => (
          <button key={type} onClick={handleAddAction(type)}>
            {type}
          </button>
        ))}
      </div>
    );
  }

  return (
    <button
      className="flex flex-row items-center self-center fill-muted gap-2 text-muted"
      onClick={() => setDisplayActionTypeSelection(true)}
    >
      <svg viewBox="0 0 24 24" width={24} height={24}>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
      Add action
    </button>
  );
};

type ReplayActionEditionProps = {
  action: DraftAction;
};

const ReplayActionEdition: React.FC<ReplayActionEditionProps> = ({ action }) => {
  switch (action.type) {
    case 'MoveCursor':
      return <MoveCursorEdition action={action} />;

    case 'InsertLines':
      return <InsertLinesEdition action={action} />;

    case 'TypeCode':
      return <TypeCodeEdition action={action} />;

    case 'EraseCode':
      return <EraseCodeEdition action={action} />;

    default:
      return null;
  }
};

const selectStepsVM = createSelector(selectReplay, (replay) => {
  return replay.steps.map((step, n) => ({
    ...step,
    step,
    name: step.name || <>&nbsp;</>,
    isCurrent: n === replay.currentStepIndex,
    isPlayed: n <= replay.currentStepIndex,
    summary: (step.actions.find((action) => action.type === 'TypeCode') as TypeCodeActionData)?.code ?? '',
  }));
});

export const StepsList: React.FC = () => {
  const steps = useSelector(selectStepsVM);

  return (
    <div className="flex flex-col max-w-sm border-r min-w-sm border-light">
      <StepsListHeader />
      <ul className="flex flex-col flex-grow overflow-y-auto margin-0">
        {steps.map((step, n) => (
          <StepsListItem key={n} index={n} {...step} />
        ))}
      </ul>
    </div>
  );
};

const StepsListHeader: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row p-4 text-xl">
      <div className="flex-grow">Steps</div>

      <button className="fill-muted" onClick={() => dispatch(addStep())}>
        <svg viewBox="0 0 24 24" width={24} height={24}>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </button>
    </div>
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
    <li
      role="button"
      className={cx(
        'flex flex-row items-center py-2 px-4 bg-dark hover:bg-dark-alternate transition-colors border-t-dark-alternate border-t-2',
        isCurrent && '!bg-dark-alternate cursor-default text-xl',
        !isPlayed && 'text-muted',
      )}
      onClick={handleStepClick(step)}
    >
      <div className="flex-grow overflow-x-hidden">
        <div>{name}</div>
        <div className="overflow-hidden text-xs text-muted whitespace-nowrap text-ellipsis">{summary}</div>
      </div>
      {isCurrent && <div className="text-3xl text-muted">{'➜'}</div>}
    </li>
  );
};
