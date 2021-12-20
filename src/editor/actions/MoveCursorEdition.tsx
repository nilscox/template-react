import { ActionEdition } from '../ActionEdition';
import { CursorPositionInput } from '../CursorPositionInput';
import { DraftMoveCursorAction } from '../domain/editor.slice';

type MoveCursorEditionProps = {
  action: DraftMoveCursorAction;
};

export const MoveCursorEdition: React.FC<MoveCursorEditionProps> = ({ action }) => (
  <ActionEdition name="Move the cursor" description="Move the cursor to a given position" action={action}>
    {(onChange) => (
      <CursorPositionInput
        line={action.position.line}
        onLineChange={(line) => onChange('position.line', line)}
        column={action.position.column}
        onColumnChange={(column) => onChange('position.column', column)}
      />
    )}
  </ActionEdition>
);
