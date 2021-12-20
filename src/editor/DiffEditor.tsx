import { DiffEditor as MonacoDiffEditor, DiffOnMount } from '@monaco-editor/react';
import { useDispatch } from 'react-redux';

import { setDiffEditor } from './domain/usecases/setEditors';

export const DiffEditor: React.FC = () => {
  const dispatch = useDispatch();

  const handleMount: DiffOnMount = (editor, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    dispatch(setDiffEditor(editor, monaco));
  };

  return (
    <MonacoDiffEditor
      className="monaco-editor"
      originalLanguage="typescript"
      modifiedLanguage="typescript"
      language="typescript"
      theme="vs-dark"
      height={440}
      options={{
        readOnly: true,
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
  );
};
