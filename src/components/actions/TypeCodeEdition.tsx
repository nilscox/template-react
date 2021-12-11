import { TypeCode } from '../../actions/TypeCode';

type TypeCodeEditionProps = {
  typeCode: TypeCode;
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
            <input type="number" value={typeCode.prepare.insertLinesBefore ?? 0} />
            line(s) above the cursor
          </label>

          <label className="flex flex-row items-center gap-4">
            Insert
            <input type="number" value={typeCode.prepare.insertLinesBefore ?? 0} />
            line(s) below the cursor
          </label>
        </div>

        <div className="flex flex-col card flex-3 gap-4">
          <div className="text-lg">Code</div>
          <textarea className="bg-darker" rows={8} value={typeCode.code} spellCheck="false" />
        </div>
      </div>
    </div>
  );
};

type CursorPositionInputProps = {
  line: number;
  onLineChange: (line: number) => void;
  column: number;
  onColumnChange: (column: number) => void;
};

const CursorPositionInput: React.FC<CursorPositionInputProps> = ({ line, onLineChange, column, onColumnChange }) => (
  <div className="flex flex-row">
    <label>
      Ln
      <input className="mx-2" type="number" value={line} onChange={(e) => onLineChange(Number(e.target.value))} />
    </label>
    <label>
      Col
      <input className="mx-2" type="number" value={column} onChange={(e) => onColumnChange(Number(e.target.value))} />
    </label>
  </div>
);
