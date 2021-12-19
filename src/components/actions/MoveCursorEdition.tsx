import { useDispatch } from 'react-redux';

import { DraftMoveCursorAction } from '../../store/slices/editor.slice';
import { updateDraftAction } from '../../store/usecases/updateDraftAction';
import { CursorPositionInput } from '../CursorPositionInput';

type MoveCursorEditionProps = {
  action: DraftMoveCursorAction;
};

export const MoveCursorEdition: React.FC<MoveCursorEditionProps> = ({ action }) => {
  const dispatch = useDispatch();

  const handleChange = (path: string, value: string) => {
    dispatch(updateDraftAction(action, path, value));
  };

  return (
    <div className="flex flex-col p-4 card gap-4">
      <div>
        <div className="mb-1 text-xl">Move the cursor</div>
        <div className="text-muted">Move the cursor to a given position</div>
      </div>

      <CursorPositionInput
        line={action.position.line}
        onLineChange={(line) => handleChange('position.line', line)}
        column={action.position.column}
        onColumnChange={(column) => handleChange('position.column', column)}
      />
    </div>
  );
};
