import { CursorPositionInput } from '../../CursorPositionInput';
import { DraftMoveCursorAction } from '../../domain/editor.slice';
import { ActionField } from '../../domain/usecases/updateDraftAction';
import { ActionEdition } from '../ActionEdition';

type MoveCursorEditionProps = {
  action: DraftMoveCursorAction;
};

export const MoveCursorEdition: React.FC<MoveCursorEditionProps> = ({ action }) => (
  <ActionEdition name="Move the cursor" description="Move the cursor to a given position" action={action}>
    {(onChange) => (
      <CursorPositionInput
        line={action.position.line}
        onLineChange={(line) => onChange(ActionField.moveCursorLine, line)}
        column={action.position.column}
        onColumnChange={(column) => onChange(ActionField.moveCursorColumn, column)}
      />
    )}
  </ActionEdition>
);
