import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { PositionData } from '../../domain/types';
import { useSelector } from '../App';
import { Dependencies } from '../store/store';

import { selectIsTextEditorReady } from './domain/renderer.selectors';

type StatusBarProps = {
  onResize?: (width: number, height: number) => void;
};

export const StatusBar: React.FC<StatusBarProps> = ({ onResize }) => {
  const isTextEditorReady = useSelector(selectIsTextEditorReady);
  const dispatch = useDispatch();

  const [[line, column], setPosition] = useState<PositionData>([1, 1]);

  useEffect(() => {
    if (isTextEditorReady) {
      dispatch((_dispatch: unknown, _getState: unknown, { editors }: Dependencies) => {
        editors.textEditor.addPositionListener(setPosition);
      });
    }
  }, [isTextEditorReady, dispatch]);

  return (
    <div
      ref={(ref) => ref && onResize?.(ref.clientWidth, ref.clientHeight)}
      className="px-4 py-1 text-sm text-right bg-dark-alternate"
    >
      Ln {line}, Col {column}
    </div>
  );
};
