import { DraftInsertLinesAction } from '../../domain/editor.slice';
import { ActionField } from '../../domain/usecases/updateDraftAction';
import { ActionEdition } from '../ActionEdition';

type InsertLinesEditionProps = {
  action: DraftInsertLinesAction;
};

export const InsertLinesEdition: React.FC<InsertLinesEditionProps> = ({ action }) => (
  <ActionEdition name="Insert lines" description="Insert some lines above or below the cursor" action={action}>
    {(onChange) => (
      <div>
        <label className="flex flex-row items-center gap-4">
          Insert
          <input
            type="number"
            value={action.above}
            onChange={(e) => onChange(ActionField.insertLinesAbove, e.target.value)}
          />
          line(s) above the cursor
        </label>

        <label className="flex flex-row items-center gap-4">
          Insert
          <input
            type="number"
            value={action.below}
            onChange={(e) => onChange(ActionField.insertLinesBelow, e.target.value)}
          />
          line(s) below the cursor
        </label>
      </div>
    )}
  </ActionEdition>
);
