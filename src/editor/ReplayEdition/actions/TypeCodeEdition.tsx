import { DraftTypeCodeAction } from '../../domain/editor.slice';
import { ActionField } from '../../domain/usecases/updateDraftAction';
import { ActionEdition } from '../ActionEdition';

type TypeCodeEditionProps = {
  action: DraftTypeCodeAction;
};

export const TypeCodeEdition: React.FC<TypeCodeEditionProps> = ({ action }) => (
  <ActionEdition name="Type code" description="Add a chunk of code at the current cursor's position" action={action}>
    {(onChange) => (
      <textarea
        className="bg-darker"
        rows={4}
        value={action.code}
        spellCheck="false"
        onChange={(e) => onChange(ActionField.typeCodeCode, e.target.value)}
      />
    )}
  </ActionEdition>
);
