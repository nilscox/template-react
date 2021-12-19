import { expect } from 'earljs';

import { MemoryEditor } from '../MemoryEditor';

import { EraseCodeAction } from './EraseCodeAction';

describe('EraseCode', () => {
  let editor: MemoryEditor;

  beforeEach(() => {
    editor = new MemoryEditor();
  });

  it('erases all the code', () => {
    editor.insertCode('abc');
    editor.position.set([1, 4]);

    EraseCodeAction.create([1, 1]).apply(editor);

    expect(editor.code).toEqual('');
    expect(editor.position.values).toEqual([1, 1]);
  });

  it('erases part of the code on the first line', () => {
    editor.insertCode('abc');
    editor.position.set([1, 3]);

    EraseCodeAction.create([1, 2]).apply(editor);

    expect(editor.code).toEqual('ac');
    expect(editor.position.values).toEqual([1, 2]);
  });

  it('erases part of the code on multiple lines', () => {
    editor.insertCode('123\n456\n789');
    editor.position.set([3, 2]);

    EraseCodeAction.create([1, 3]).apply(editor);

    expect(editor.code).toEqual('1289');
    expect(editor.position.values).toEqual([1, 3]);
  });
});
