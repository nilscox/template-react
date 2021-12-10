import Editor, { OnMount } from '@monaco-editor/react';

import { Replay } from './Replay';

const chunkDelay = 500;
const skipToChunk = 0;

type ReplayEditorProps = {
  replay: Replay;
};

export const ReplayEditor: React.FC<ReplayEditorProps> = ({ replay }) => {
  const handleMount: OnMount = async (editor, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    editor.focus();

    replay.reset();

    for (let i = 0; i < skipToChunk; ++i) {
      replay.nextAction();
    }

    editor.setValue(replay.code);

    while (replay.progress < 1) {
      await replay.currentAction?.playForward(editor);
      replay.nextAction();

      await new Promise((r) => setTimeout(r, chunkDelay));
    }

    await replay.currentAction?.playForward(editor);
  };

  return (
    <Editor
      className="monaco-editor"
      height="calc(100vh - 24px)"
      value={replay.code}
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
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        lightbulb: { enabled: false },
      }}
      onMount={handleMount}
    />
  );
};
