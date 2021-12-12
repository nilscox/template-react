import { AddSelectionsAction } from '../../domain/types/actions';
import { CursorPositionInput } from '../CursorPositionInput';

type AddSelectionsEditionProps = {
  addSelections: AddSelectionsAction;
};

export const AddSelectionsEdition: React.FC<AddSelectionsEditionProps> = ({ addSelections }) => {
  return (
    <div className="flex flex-col h-full p-8 overflow-auto gap-8">
      <div>
        <div className="mb-1 text-xl">Add selection</div>
        <div className="text-muted">Add one or more selections</div>
      </div>

      <div className="flex flex-col card gap-4">
        {addSelections.ranges.map(([start, end], n) => (
          <div key={n} className="flex flex-row gap-8">
            <div className="flex flex-col gap-2">
              Start
              <CursorPositionInput
                line={start.line}
                onLineChange={() => {}}
                column={start.column}
                onColumnChange={() => {}}
              />
            </div>

            <div className="flex flex-col gap-2">
              End
              <CursorPositionInput
                line={end.line}
                onLineChange={() => {}}
                column={end.column}
                onColumnChange={() => {}}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
