import Editor, { OnMount } from '@monaco-editor/react';

import { useReplay } from '../App';
import { Editor as MyEditor } from '../Editor';
import { TimeManager } from '../TimeManager';

const skip = 30;

export const ReplayEditor: React.FC = () => {
  const replay = useReplay();

  const handleMount: OnMount = async (ed, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    const time = new TimeManager();
    const editor = new MyEditor(ed, time);

    // time.delays.betweenCharacters = 500;

    replay.time = time;

    ed.focus();
    replay.reset();

    time.immediate = true;

    while (replay.progress < 1) {
      if (replay.actions[skip] === replay.currentAction) {
        time.immediate = false;
      }

      await replay.currentAction?.play(editor);
      replay.nextAction();

      await time.wait('betweenActions');
    }

    await replay.currentAction?.play(editor);
  };

  return (
    <>
      <Editor
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

  return <div className="bg-dark-alternate text-right py-1 px-4">Ln 4, Col 45</div>;
};
