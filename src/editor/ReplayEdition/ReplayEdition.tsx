import { useSelector } from '../../App';
import { selectCurrentCommit, selectCurrentStep } from '../../store/slices/replay.selectors';
import { selectPropertiesEditionVisible } from '../../store/slices/ui.selectors';

import { CommitsList } from './CommitsList';
import { StepEdition } from './StepEdition';
import { StepsList } from './StepsList';

export const ReplayEdition: React.FC = () => {
  const visible = useSelector(selectPropertiesEditionVisible);
  const currentCommit = useSelector(selectCurrentCommit);
  const currentStep = useSelector(selectCurrentStep);

  if (!visible) {
    return null;
  }

  return (
    <div className="flex flex-row flex-grow overflow-hidden bg-dark">
      <CommitsList />
      {currentCommit && <StepsList />}
      {currentStep && <StepEdition />}
    </div>
  );
};
