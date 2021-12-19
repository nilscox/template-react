import { useDispatch } from 'react-redux';

import { DraftEraseCodeAction } from '../../store/slices/editor.slice';
import { updateDraftAction } from '../../store/usecases/updateDraftAction';
import { CursorPositionInput } from '../CursorPositionInput';

type EraseCodeEditionProps = {
  action: DraftEraseCodeAction;
};

export const EraseCodeEdition: React.FC<EraseCodeEditionProps> = ({ action }) => {
  const dispatch = useDispatch();

  const handleChange = (path: string, value: string) => {
    dispatch(updateDraftAction(action, path, value));
  };

  return (
    <div className="flex flex-col p-4 card gap-4">
      <div>
        <div className="mb-1 text-xl">Erase code</div>
        <div className="text-muted">Delete characters one by one until an end position</div>
      </div>

      <div className="flex flex-col gap-2">
        End position
        <CursorPositionInput
          line={action.end.line}
          onLineChange={(line) => handleChange('end.line', line)}
          column={action.end.column}
          onColumnChange={(column) => handleChange('end.column', column)}
        />
      </div>
    </div>
  );
};
