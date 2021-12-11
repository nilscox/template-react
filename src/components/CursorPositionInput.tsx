type CursorPositionInputProps = {
  line: number;
  onLineChange: (line: number) => void;
  column: number;
  onColumnChange: (column: number) => void;
};

export const CursorPositionInput: React.FC<CursorPositionInputProps> = ({
  line,
  onLineChange,
  column,
  onColumnChange,
}) => (
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
