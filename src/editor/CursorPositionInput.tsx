type CursorPositionInputProps = {
  line: string;
  onLineChange: (line: string) => void;
  column: string;
  onColumnChange: (column: string) => void;
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
      <input className="mx-2" type="number" min={1} value={line} onChange={(e) => onLineChange(e.target.value)} />
    </label>
    <label>
      Col
      <input className="mx-2" type="number" min={1} value={column} onChange={(e) => onColumnChange(e.target.value)} />
    </label>
  </div>
);
