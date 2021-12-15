import { DiffEditor, DiffOnMount } from '@monaco-editor/react';
import { useDispatch } from 'react-redux';

import { setDiffEditor } from '../store/usecases/setEditors';

import { StatusBar } from './StatusBar';

export const ReplayEditor: React.FC = () => {
  const dispatch = useDispatch();

  const handleMount: DiffOnMount = (editor, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    dispatch(setDiffEditor(editor, monaco));
  };

  return (
    <>
      <DiffEditor
        className="monaco-editor"
        originalLanguage="typescript"
        modifiedLanguage="typescript"
        theme="vs-dark"
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
          renderOverviewRuler: false,
        }}
        onMount={handleMount}
      />
      {/* <StatusBar /> */}
    </>
  );
};
