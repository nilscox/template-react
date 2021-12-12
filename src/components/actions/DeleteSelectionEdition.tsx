import { DeleteSelectionAction } from '../../domain/types/actions';

type DeleteSelectionEditionProps = {
  deleteSelection: DeleteSelectionAction;
};

export const DeleteSelectionEdition: React.FC<DeleteSelectionEditionProps> = () => {
  return (
    <div className="flex flex-col h-full p-8 overflow-auto gap-8">
      <div>
        <div className="mb-1 text-xl">Delete selection</div>
        <div className="text-muted">Delete the code currently selected</div>
      </div>
    </div>
  );
};
