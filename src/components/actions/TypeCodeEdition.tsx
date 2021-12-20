import { DraftTypeCodeAction } from '../../store/slices/editor.slice';
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
        onChange={(e) => onChange('code', e.target.value)}
      />
    )}
  </ActionEdition>
);
