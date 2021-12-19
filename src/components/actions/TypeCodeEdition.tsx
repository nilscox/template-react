import { useDispatch } from 'react-redux';

import { DraftTypeCodeAction } from '../../store/slices/editor.slice';
import { updateDraftAction } from '../../store/usecases/updateDraftAction';

type TypeCodeEditionProps = {
  action: DraftTypeCodeAction;
};

export const TypeCodeEdition: React.FC<TypeCodeEditionProps> = ({ action }) => {
  const dispatch = useDispatch();

  const handleChange = (path: string, value: string) => {
    dispatch(updateDraftAction(action, path, value));
  };

  return (
    <div className="flex flex-col p-4 card gap-4">
      <div>
        <div className="mb-1 text-xl">Type code</div>
        <div className="text-muted">Add a chunk of code at a given position</div>
      </div>

      <textarea
        className="bg-darker"
        rows={4}
        value={action.code}
        spellCheck="false"
        onChange={(e) => handleChange('code', e.target.value)}
      />
    </div>
  );
};
