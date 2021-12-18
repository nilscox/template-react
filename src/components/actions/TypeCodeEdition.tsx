import { useDispatch } from 'react-redux';

import { DraftTypeCodeAction } from '../../store/slices/editor.slice';
import { updateDraftAction } from '../../store/usecases/updateDraftAction';
import { CursorPositionInput } from '../CursorPositionInput';

type TypeCodeEditionProps = {
  action: DraftTypeCodeAction;
};

export const TypeCodeEdition: React.FC<TypeCodeEditionProps> = ({ action }) => {
  const dispatch = useDispatch();

  const handleChange = (path: string, value: string) => {
    dispatch(updateDraftAction(path, value));
  };

  const [line, column] = action.position;

  return (
    <div className="flex flex-col h-full p-8 overflow-auto gap-8">
      <div>
        <div className="mb-1 text-xl">Type code</div>
        <div className="text-muted">Add a chunk of code at a given position</div>
      </div>

      <div className="flex flex-row items-start gap-4">
        <div className="flex flex-col flex-grow card gap-4">
          <div className="text-lg">Prepare</div>

          <div className="flex flex-col gap-2">
            Start position
            <CursorPositionInput
              line={line}
              onLineChange={(line) => handleChange('position.line', line)}
              column={column}
              onColumnChange={(column) => handleChange('position.column', column)}
            />
          </div>

          <label className="flex flex-row items-center gap-4">
            Insert
            <input
              type="number"
              value={action.prepare.insertLinesAbove ?? 0}
              onChange={(e) => handleChange('prepare.insertLinesAbove', e.target.value)}
            />
            line(s) above the cursor
          </label>

          <label className="flex flex-row items-center gap-4">
            Insert
            <input
              type="number"
              value={action.prepare.insertLinesBelow ?? 0}
              onChange={(e) => handleChange('prepare.insertLinesBelow', e.target.value)}
            />
            line(s) below the cursor
          </label>
        </div>

        <div className="flex flex-col card flex-3 gap-4">
          <div className="text-lg">Code</div>
          <textarea
            className="bg-darker"
            rows={8}
            value={action.code}
            spellCheck="false"
            onChange={(e) => handleChange('code', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
