import { useDispatch } from 'react-redux';

import { updateDraftAction } from '../../domain/slices/editor.slice';
import { DraftEraseCodeAction } from '../../domain/types/entities';
import { CursorPositionInput } from '../CursorPositionInput';

type EraseCodeEditionProps = {
  action: DraftEraseCodeAction;
};

export const EraseCodeEdition: React.FC<EraseCodeEditionProps> = ({ action }) => {
  const dispatch = useDispatch();

  const handleChange = (path: string, value: string) => {
    dispatch(updateDraftAction({ path, value }));
  };

  return (
    <div className="flex flex-col h-full p-8 overflow-auto gap-8">
      <div>
        <div className="mb-1 text-xl">Erase code</div>
        <div className="text-muted">Delete characters one by one between two positions</div>
      </div>

      <div className="flex flex-col card gap-4">
        <div className="flex flex-col gap-2">
          Start position
          <CursorPositionInput
            line={action.start.line}
            onLineChange={(line) => handleChange('start.line', line)}
            column={action.start.column}
            onColumnChange={(column) => handleChange('start.column', column)}
          />
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
    </div>
  );
};
