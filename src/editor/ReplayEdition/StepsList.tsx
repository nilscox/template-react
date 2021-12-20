import { ReactNode } from 'react';

import { createSelector } from '@reduxjs/toolkit';
import cx from 'classnames';
import { useDispatch } from 'react-redux';

import { PlayedStepData, TypeCodeActionData } from '../../../domain/Replay';
import { useSelector } from '../../App';
import { selectReplay } from '../../store/slices/replay.selectors';
import { addStep } from '../domain/usecases/addStep';
import { moveCursorToInitialPosition } from '../domain/usecases/moveCursorToInitialPosition';
import { setCurrentStep } from '../domain/usecases/setCurrentStep';

export const selectStepsVM = createSelector(selectReplay, (replay) => {
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

      <ul className="flex flex-col flex-grow pb-8 overflow-y-auto margin-0">
        {steps.map((step, n) => (
          <StepsListItem key={n} index={n} {...step} />
        ))}

        <AddStep />
      </ul>
    </div>
  );
};

const StepsListHeader: React.FC = () => {
  return <div className="p-4 text-xl border-b-4 border-dark-alternate">Steps</div>;
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
        'flex flex-row items-center py-2 px-4 bg-dark hover:bg-dark-alternate transition-colors border-dark-alternate border-b-2',
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

const AddStep: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <li className="self-center py-4">
      <button
        className="flex flex-row items-center self-center fill-muted gap-2 text-muted"
        onClick={() => dispatch(addStep())}
      >
        <svg viewBox="0 0 24 24" width={24} height={24}>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        Add step
      </button>
    </li>
  );
};
