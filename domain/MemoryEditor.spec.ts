import { expect } from 'earljs';

import { MemoryEditor } from './MemoryEditor';

describe('MemoryEditor', () => {
  let editor: MemoryEditor;

  beforeEach(() => {
    editor = new MemoryEditor();
    editor.insertCode('abc\ndef');
  });

  const setPosition = (line: number, column: number) => {
    editor.position.line = line;
    editor.position.column = column;
  };

  it('computes the code before the cursor', () => {
    setPosition(1, 1);
    expect(editor.codeBeforeCursor).toEqual(['']);

    setPosition(1, 2);
    expect(editor.codeBeforeCursor).toEqual(['a']);

    setPosition(2, 1);
    expect(editor.codeBeforeCursor).toEqual(['abc', '']);

    setPosition(2, 2);
    expect(editor.codeBeforeCursor).toEqual(['abc', 'd']);

    setPosition(2, 4);
    expect(editor.codeBeforeCursor).toEqual(['abc', 'def']);
  });

  it('computes the code after the cursor', () => {
    setPosition(1, 1);
    expect(editor.codeAfterCursor).toEqual(['abc', 'def']);

    setPosition(1, 2);
    expect(editor.codeAfterCursor).toEqual(['bc', 'def']);

    setPosition(2, 1);
    expect(editor.codeAfterCursor).toEqual(['def']);

    setPosition(2, 2);
    expect(editor.codeAfterCursor).toEqual(['ef']);

    setPosition(2, 4);
    expect(editor.codeAfterCursor).toEqual(['']);
  });
});
