import { useDispatch, useSelector } from 'react-redux';

import { selectPropertiesEditionVisible } from '../domain/slices/ui.selectors';
import { setPropertiesEditionVisible } from '../domain/slices/ui.slice';
import { nextAction } from '../domain/usecases/nextAction';

export const StatusBar: React.FC = () => {
  const dispatch = useDispatch();
  const propertiesEditionVisible = useSelector(selectPropertiesEditionVisible);

  return (
    <div className="flex flex-row justify-between px-4 py-1 text-right bg-dark-alternate">
      <div>
        <button onClick={() => dispatch(setPropertiesEditionVisible(!propertiesEditionVisible))}>
          {propertiesEditionVisible ? '▼' : '▲'}
        </button>
      </div>

      <div>
        <button style={{ lineHeight: 0 }} className="text-lg" onClick={() => dispatch(nextAction())}>
          ▶
        </button>
      </div>

      <div>Ln 4, Col 45</div>
    </div>
  );
};
