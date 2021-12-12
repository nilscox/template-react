import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { useDispatch } from 'react-redux';

import { setEditorReady } from '../domain/editor.slice';
import { Editor } from '../Editor';

import { StatusBar } from './StatusBar';

export const ReplayEditor: React.FC = () => {
  const dispatch = useDispatch();

  const handleMount: OnMount = async (editor, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    dispatch((dispatch: any, _getState: any, dependencies: any) => {
      dependencies.editor = new Editor(editor, dependencies.scheduler);
      dispatch(setEditorReady(true));
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
