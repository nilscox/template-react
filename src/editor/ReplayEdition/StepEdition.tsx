import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { ActionType, ReplayActionData } from '../../../domain/Replay';
import { useSelector } from '../../App';
import { selectCurrentStep, selectReplay } from '../../store/slices/replay.selectors';
import { setStepName } from '../../store/slices/replay.slice';
import { selectDraftStep } from '../domain/editor.selectors';
import { DraftAction } from '../domain/editor.slice';
import { addAction } from '../domain/usecases/addAction';

import { EraseCodeEdition } from './actions/EraseCodeEdition';
import { InsertLinesEdition } from './actions/InsertLinesEdition';
import { MoveCursorEdition } from './actions/MoveCursorEdition';
import { TypeCodeEdition } from './actions/TypeCodeEdition';

export const StepEdition: React.FC = () => {
  const dispatch = useDispatch();
  const draftStep = useSelector(selectDraftStep);
  const currentStep = useSelector(selectCurrentStep);
  const { currentStepIndex } = useSelector(selectReplay);

  if (!draftStep) {
    return null;
  }

  return (
    <div className="flex flex-col flex-grow h-full max-h-full p-4 overflow-y-auto gap-4">
      <StepNameInput
        name={currentStep.name}
        onChange={(name) => dispatch(setStepName({ index: currentStepIndex, name }))}
      />

      {draftStep.actions.map((action, n) => (
        <ActionEdition key={n} action={action} />
      ))}

      <AddAction key={currentStepIndex} />
    </div>
  );
};

type StepNameInputProps = {
  name: string;
  onChange: (name: string) => void;
};

const StepNameInput: React.FC<StepNameInputProps> = ({ name, onChange }) => (
  <input
    className="px-2 py-1 text-xl bg-transparent"
    value={name}
    placeholder="Step name..."
    autoFocus={name === ''}
    onChange={(e) => onChange(e.target.value)}
  />
);

const AddAction: React.FC = () => {
  const dispatch = useDispatch();
  const [displayActionTypeSelection, setDisplayActionTypeSelection] = useState(false);

  const handleAddAction = (type: ReplayActionData['type']) => () => {
    dispatch(addAction(type));
    setDisplayActionTypeSelection(false);
  };

  if (displayActionTypeSelection) {
    return (
      <div className="flex flex-col items-start gap-2">
        {Object.values(ActionType).map((type) => (
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

type ActionEditionProps = {
  action: DraftAction;
};

const ActionEdition: React.FC<ActionEditionProps> = ({ action }) => {
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
