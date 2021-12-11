/** @jsx jsx */
import { Fragment } from 'react';

import { jsx } from '@emotion/react';
import Editor, { OnMount } from '@monaco-editor/react';

import { Editor as MyEditor } from './Editor';
import { Replay } from './Replay';
import { TimeManager } from './TimeManager';

const skip = 30;

type ReplayEditorProps = {
  replay: Replay;
};

export const ReplayEditor: React.FC<ReplayEditorProps> = ({ replay }) => {
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
    <Fragment>
      <Editor
        className="monaco-editor"
        // height="calc(100vh - 24px)"
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
      <div css={{ background: '#292929', color: '#CCC', textAlign: 'right', padding: '2px 12px' }}>Ln 4, Col 45</div>
    </Fragment>
  );
};
