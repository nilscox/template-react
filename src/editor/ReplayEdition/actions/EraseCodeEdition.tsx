import { CursorPositionInput } from '../../CursorPositionInput';
import { DraftEraseCodeAction } from '../../domain/editor.slice';
import { ActionEdition } from '../ActionEdition';

type EraseCodeEditionProps = {
  action: DraftEraseCodeAction;
};

export const EraseCodeEdition: React.FC<EraseCodeEditionProps> = ({ action }) => (
  <ActionEdition name="Erase code" description="Delete characters one by one until an end position" action={action}>
    {(onChange) => (
      <div className="flex flex-col gap-2">
        End position
        <CursorPositionInput
          line={action.end.line}
          onLineChange={(line) => onChange('end.line', line)}
          column={action.end.column}
          onColumnChange={(column) => onChange('end.column', column)}
        />
      </div>
    )}
  </ActionEdition>
);
