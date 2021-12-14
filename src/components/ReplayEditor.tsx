import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { useDispatch } from 'react-redux';

import { setEditorReady } from '../domain/slices/editor.slice';
import { Dependencies, Dispatch, GetState } from '../domain/store';
import { Editor } from '../Editor';

import { StatusBar } from './StatusBar';

export const ReplayEditor: React.FC = () => {
  const dispatch = useDispatch();

  const handleMount: OnMount = (editor, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    dispatch((dispatch: Dispatch, _getState: GetState, dependencies: Dependencies) => {
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
