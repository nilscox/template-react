import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { useDispatch } from 'react-redux';

import { useReplay } from '../App';
import { Editor } from '../Editor';

export const ReplayEditor: React.FC = () => {
  const dispatch = useDispatch();

  const handleMount: OnMount = async (editor, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    dispatch((dispatch: any, _getState: any, dependencies: any) => {
      dependencies.editor = new Editor(editor, dependencies.scheduler);
      dispatch({ type: 'setEditorReady', ready: true });
    });
  };

  return (
    <>
      <MonacoEditor
        className="monaco-editor"
        language="typescript"
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
        }}
        onMount={handleMount}
      />
      <StatusBar />
    </>
  );
};

const StatusBar = () => {
  const replay = useReplay();

  return <div className="px-4 py-1 text-right bg-dark-alternate">Ln 4, Col 45</div>;
};
