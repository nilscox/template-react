import { expect } from 'earljs';

import { MemoryEditor } from '../MemoryEditor';

import { MoveCursorAction } from './MoveCursorAction';

describe('MoveCursorAction', () => {
  const a = '123';
  const b = '456';
  const c = '789';

  const abc = [a, b, c].join('\n');

  it('moves the cursor to a given position', () => {
    const editor = new MemoryEditor();

    editor.code = abc;

    MoveCursorAction.create([2, 2]).apply(editor);

    expect(editor.code).toEqual(abc);
    expect(editor.position.values).toEqual([2, 2]);
  });
});
