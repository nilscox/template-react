import Editor, { OnMount } from '@monaco-editor/react';

import { Chunk, ChunkAddition, ChunkRemoval } from './Chunk';
import { Replay } from './Replay';

const typeDelay = 12;
const cursorMovementDelay = 300;
const chunkDelay = 700;

// const typeDelay = 120;
// const cursorMovementDelay = 300;
// const chunkDelay = 500;

const skipToChunk = 8;

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

    const playChunk = async (chunk: Chunk) => {
      const [line, column] = replay.cursorPosition;

      editor.setPosition({ lineNumber: line, column });
      await new Promise((r) => setTimeout(r, cursorMovementDelay));

      if (chunk instanceof ChunkAddition) {
        for (const char of chunk.code) {
          editor.trigger('keyboard', 'type', { text: char });
          await new Promise((r) => setTimeout(r, typeDelay));
        }
      }

      if (chunk instanceof ChunkRemoval) {
        const [endLine, endColumn] = chunk.finalCursorPosition;

        const isFinalPosition = () => {
          const { lineNumber: currentLine, column: currentColumn } = editor.getPosition() ?? {};

          return currentLine === endLine && currentColumn === endColumn;
        };

        while (!isFinalPosition()) {
          editor.trigger('keyboard', 'deleteLeft', {});
          await new Promise((r) => setTimeout(r, typeDelay));
        }
      }
    };

    while (replay.progress < 1) {
      await playChunk(replay.currentAction);
      replay.nextAction();

      await new Promise((r) => setTimeout(r, chunkDelay));
    }

    await playChunk(replay.currentAction);

    editor.setSelections([
      { selectionStartLineNumber: 17, selectionStartColumn: 1, positionLineNumber: 21, positionColumn: 1 },
      { selectionStartLineNumber: 22, selectionStartColumn: 1, positionLineNumber: 24, positionColumn: 1 },
      { selectionStartLineNumber: 24, selectionStartColumn: 1, positionLineNumber: 24, positionColumn: 13 },
      { selectionStartLineNumber: 24, selectionStartColumn: 29, positionLineNumber: 24, positionColumn: 30 },
    ]);
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
