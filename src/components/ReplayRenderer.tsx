import { useState } from 'react';

import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { useDispatch, useSelector } from 'react-redux';

import { selectEditorsHeight } from '../store/slices/ui.selectors';
import { setEditor } from '../store/usecases/setEditors';

import { StatusBar } from './StatusBar';

export const ReplayRenderer: React.FC = () => {
  const dispatch = useDispatch();

  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const editorsHeight = useSelector(selectEditorsHeight);

  const handleMount: OnMount = (editor, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    dispatch(setEditor(editor));
  };

  return (
    <>
      <MonacoEditor
        className="pb-16 monaco-editor"
        language="typescript"
        theme="vs-dark"
        height={editorsHeight - statusBarHeight}
        options={{
          autoClosingBrackets: 'never',
          autoIndent: 'none',
          autoClosingDelete: 'never',
          autoClosingOvertype: 'never',
          autoClosingQuotes: 'never',
          autoSurround: 'never',
          formatOnType: false,
          quickSuggestions: false,
          codeLens: false,
          scrollBeyondLastLine: false,
          hover: { enabled: false },
          minimap: { enabled: false },
          lightbulb: { enabled: false },
        }}
        onMount={handleMount}
      />
      <StatusBar onResize={(_, height) => setStatusBarHeight(height)} />
    </>
  );
};
