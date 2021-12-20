import { useDispatch } from 'react-redux';

import { DraftAction } from '../domain/editor.slice';
import { removeAction } from '../domain/usecases/removeAction';
import { updateDraftAction } from '../domain/usecases/updateDraftAction';

type ActionEditionProps = {
  action: DraftAction;
  name: string;
  description: string;
  children: (onChange: (path: string, value: string) => void) => React.ReactNode;
};

export const ActionEdition: React.FC<ActionEditionProps> = ({ action, name, description, children }) => {
  const dispatch = useDispatch();

  const handleChange = (path: string, value: string) => {
    dispatch(updateDraftAction(action, path, value));
  };

  return (
    <div className="relative flex flex-col p-4 card gap-4">
      <RemoveAction action={action} />

      <div>
        <div className="mb-1 text-xl">{name}</div>
        <div className="text-muted">{description}</div>
      </div>

      {children(handleChange)}
    </div>
  );
};

type RemoveActionProps = {
  action: DraftAction;
};

const RemoveAction: React.FC<RemoveActionProps> = ({ action }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeAction(action));
  };

  return (
    <button onClick={handleRemove} className="absolute fill-muted top-2 right-2">
      <svg viewBox="0 0 24 24" width={24} height={24}>
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </button>
  );
};
