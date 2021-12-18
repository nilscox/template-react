import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { PositionData } from '../../domain/Replay';
import { useSelector } from '../App';
import { selectAreEditorsReady } from '../store/slices/editor.selectors';
import { Dependencies } from '../store/store';

type StatusBarProps = {
  onResize?: (width: number, height: number) => void;
};

export const StatusBar: React.FC<StatusBarProps> = ({ onResize }) => {
  const areEditorsReady = useSelector(selectAreEditorsReady);
  const dispatch = useDispatch();

  const [[line, column], setPosition] = useState<PositionData>([1, 1]);

  useEffect(() => {
    if (areEditorsReady) {
      dispatch((_dispatch: unknown, _getState: unknown, { editors }: Dependencies) => {
        editors.textEditor.addPositionListener(setPosition);
      });
    }
  }, [areEditorsReady, dispatch]);

  return (
    <div
      ref={(ref) => ref && onResize?.(ref.clientWidth, ref.clientHeight)}
      className="px-4 py-1 text-sm text-right bg-dark-alternate"
    >
      Ln {line}, Col {column}
    </div>
  );
};
