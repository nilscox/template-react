import { TypeCodeAction } from '../../domain/replay.slice';
import { CursorPositionInput } from '../CursorPositionInput';

type TypeCodeEditionProps = {
  typeCode: TypeCodeAction;
};

export const TypeCodeEdition: React.FC<TypeCodeEditionProps> = ({ typeCode }) => {
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
              line={typeCode.position.line}
              onLineChange={() => {}}
              column={typeCode.position.column}
              onColumnChange={() => {}}
            />
          </div>

          <label className="flex flex-row items-center gap-4">
            Insert
            <input type="number" value={typeCode.prepare.insertLinesAbove ?? 0} onChange={() => {}} />
            line(s) above the cursor
          </label>

          <label className="flex flex-row items-center gap-4">
            Insert
            <input type="number" value={typeCode.prepare.insertLinesBelow ?? 0} onChange={() => {}} />
            line(s) below the cursor
          </label>
        </div>

        <div className="flex flex-col card flex-3 gap-4">
          <div className="text-lg">Code</div>
          <textarea className="bg-darker" rows={8} value={typeCode.code} spellCheck="false" onChange={() => {}} />
        </div>
      </div>
    </div>
  );
};
