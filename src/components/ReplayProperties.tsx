import { createSelector } from '@reduxjs/toolkit';
import cx from 'classnames';
import { useDispatch } from 'react-redux';

import { PlayedStepData, TypeCodeActionData } from '../../domain/Replay';
import { useSelector } from '../App';
import { selectDraftStep } from '../store/slices/editor.selectors';
import { DraftAction } from '../store/slices/editor.slice';
import { selectCurrentStep, selectReplay } from '../store/slices/replay.selectors';
import { setStepName } from '../store/slices/replay.slice';
import { selectPropertiesEditionVisible } from '../store/slices/ui.selectors';
import { moveCursorToInitialPosition } from '../store/usecases/moveCursorToInitialPosition';
import { setCurrentStep } from '../store/usecases/setCurrentStep';

import { EraseCodeEdition } from './actions/EraseCodeEdition';
import { InsertLinesEdition } from './actions/InsertLinesEdition';
import { MoveCursorEdition } from './actions/MoveCursorEdition';
import { TypeCodeEdition } from './actions/TypeCodeEdition';

export const ReplayProperties: React.FC = () => {
  const visible = useSelector(selectPropertiesEditionVisible);

  if (!visible) {
    return null;
  }

  return (
    <div className="flex flex-row flex-grow overflow-hidden bg-dark">
      <div className="max-w-sm border-r min-w-sm border-light">
        <StepsList />
      </div>
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
        className="flex-grow px-2 py-1 text-xl bg-transparent"
        value={currentStep.name}
        onChange={(e) => handleChange(e.target.value)}
      />
      {draftStep.actions.map((action, n) => (
        <ReplayActionEdition key={n} action={action} />
      ))}
    </div>
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
    isCurrent: n === replay.currentStepIndex,
    isPlayed: n <= replay.currentStepIndex,
    summary: (step.actions.find((action) => action.type === 'TypeCode') as TypeCodeActionData)?.code ?? '',
  }));
});

export const StepsList: React.FC = () => {
  const dispatch = useDispatch();
  const steps = useSelector(selectStepsVM);

  const handleActionClick = (action: PlayedStepData) => () => {
    dispatch(setCurrentStep(action));
    dispatch(moveCursorToInitialPosition());
  };

  return (
    <ul className="flex flex-col max-h-full overflow-auto margin-0 bg-dark-alternate gap-[2px]">
      {steps.map((step, n) => (
        <li
          key={n}
          role="button"
          className={cx(
            'flex flex-row items-center py-2 px-4 bg-dark hover:bg-dark-alternate transition-colors',
            step.isCurrent && '!bg-dark-alternate cursor-default text-xl',
            !step.isPlayed && 'text-muted',
          )}
          onClick={handleActionClick(step.step)}
        >
          <div className="flex-grow overflow-x-hidden">
            <div>{step.name}</div>
            <div className="overflow-hidden text-xs text-muted whitespace-nowrap text-ellipsis">{step.summary}</div>
          </div>
          {step.isCurrent && <div className="text-3xl text-muted">{'➜'}</div>}
        </li>
      ))}
    </ul>
  );
};
