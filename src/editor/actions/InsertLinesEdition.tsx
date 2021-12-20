import { ActionEdition } from '../ActionEdition';
import { DraftInsertLinesAction } from '../domain/editor.slice';

type InsertLinesEditionProps = {
  action: DraftInsertLinesAction;
};

export const InsertLinesEdition: React.FC<InsertLinesEditionProps> = ({ action }) => (
  <ActionEdition name="Insert lines" description="Insert some lines above or below the cursor" action={action}>
    {(onChange) => (
      <div>
        <label className="flex flex-row items-center gap-4">
          Insert
          <input type="number" value={action.above} onChange={(e) => onChange('above', e.target.value)} />
          line(s) above the cursor
        </label>

        <label className="flex flex-row items-center gap-4">
          Insert
          <input type="number" value={action.below} onChange={(e) => onChange('below', e.target.value)} />
          line(s) below the cursor
        </label>
      </div>
    )}
  </ActionEdition>
);
