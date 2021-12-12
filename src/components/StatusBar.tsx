import { useDispatch, useSelector } from 'react-redux';

import { nextAction } from '../domain/nextAction';
import { selectPropertiesEditionVisible } from '../domain/ui.selectors';
import { setPropertiesEditionVisible } from '../domain/ui.slice';

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
