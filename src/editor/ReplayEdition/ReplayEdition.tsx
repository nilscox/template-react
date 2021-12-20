import { useSelector } from '../../App';
import { selectPropertiesEditionVisible } from '../../store/slices/ui.selectors';

import { StepEdition } from './StepEdition';
import { StepsList } from './StepsList';

export const ReplayEdition: React.FC = () => {
  const visible = useSelector(selectPropertiesEditionVisible);

  if (!visible) {
    return null;
  }

  return (
    <div className="flex flex-row flex-grow overflow-hidden bg-dark">
      <StepsList />
      <StepEdition />
    </div>
  );
};
