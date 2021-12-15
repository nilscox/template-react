import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { useSelector } from '../App';
import { selectAreEditorsReady } from '../store/slices/editor.selectors';
import { Dependencies } from '../store/store';
import { Position } from '../store/types/entities';

export const StatusBar: React.FC = () => {
  const areEditorsReady = useSelector(selectAreEditorsReady);
  const dispatch = useDispatch();

  const [{ line, column }, setPosition] = useState<Position>({ line: 1, column: 1 });

  useEffect(() => {
    if (areEditorsReady) {
      dispatch((_dispatch: unknown, _getState: unknown, { editors }: Dependencies) => {
        editors.textEditor.addPositionListener(setPosition);
      });
    }
  }, [areEditorsReady, dispatch]);

  return (
    <div className="px-4 py-1 text-sm text-right bg-dark-alternate">
      Ln {line}, Col {column}
    </div>
  );
};
