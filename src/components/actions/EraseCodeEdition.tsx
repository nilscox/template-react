import { EraseCodeAction } from '../../domain/types/actions';
import { CursorPositionInput } from '../CursorPositionInput';

type EraseCodeEditionProps = {
  eraseCode: EraseCodeAction;
};

export const EraseCodeEdition: React.FC<EraseCodeEditionProps> = ({ eraseCode }) => {
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
            line={eraseCode.start.line}
            onLineChange={() => {}}
            column={eraseCode.start.column}
            onColumnChange={() => {}}
          />
        </div>

        <div className="flex flex-col gap-2">
          End position
          <CursorPositionInput
            line={eraseCode.end.line}
            onLineChange={() => {}}
            column={eraseCode.end.column}
            onColumnChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
