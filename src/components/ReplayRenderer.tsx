import { useState } from 'react';

import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { useDispatch } from 'react-redux';

import { setEditor } from '../store/usecases/setEditors';

import { StatusBar } from './StatusBar';

export const ReplayRenderer: React.FC = () => {
  const dispatch = useDispatch();

  const [statusBarHeight, setStatusBarHeight] = useState(0);

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
        className="monaco-editor"
        language="typescript"
        theme="vs-dark"
        height={440 - statusBarHeight}
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
