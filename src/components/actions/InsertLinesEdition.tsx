import { useDispatch } from 'react-redux';

import { DraftInsertLinesAction } from '../../store/slices/editor.slice';
import { updateDraftAction } from '../../store/usecases/updateDraftAction';

type InsertLinesEditionProps = {
  action: DraftInsertLinesAction;
};

export const InsertLinesEdition: React.FC<InsertLinesEditionProps> = ({ action }) => {
  const dispatch = useDispatch();

  const handleChange = (path: string, value: string) => {
    dispatch(updateDraftAction(action, path, value));
  };

  return (
    <div className="flex flex-col p-4 card gap-4">
      <div>
        <div className="mb-1 text-xl">Insert lines</div>
        <div className="text-muted">Insert some lines above or below the cursor</div>
      </div>

      <div>
        <label className="flex flex-row items-center gap-4">
          Insert
          <input type="number" value={action.above ?? 0} onChange={(e) => handleChange('above', e.target.value)} />
          line(s) above the cursor
        </label>

        <label className="flex flex-row items-center gap-4">
          Insert
          <input type="number" value={action.below ?? 0} onChange={(e) => handleChange('below', e.target.value)} />
          line(s) below the cursor
        </label>
      </div>
    </div>
  );
};
