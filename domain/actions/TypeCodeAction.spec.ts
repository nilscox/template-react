import { expect } from 'earljs';

import { MemoryEditor } from '../MemoryEditor';

import { TypeCodeAction } from './TypeCodeAction';

describe('TypeCodeAction', () => {
  const a = '123';
  const b = '456';
  const c = '789';

  const abc = [a, b, c].join('\n');

  let editor: MemoryEditor;

  beforeEach(() => {
    editor = new MemoryEditor();
  });

  describe('empty editor', () => {
    it('adds code to an empty editor', () => {
      TypeCodeAction.create(a).apply(editor);

      expect(editor.code).toEqual('123');
      expect(editor.position.values).toEqual([1, 4]);
    });

    it('adds code containing multiple lines', () => {
      TypeCodeAction.create(abc).apply(editor);

      expect(editor.code).toEqual(abc);
      expect(editor.position.values).toEqual([3, 4]);
    });
  });

  describe('editor with one line', () => {
    beforeEach(() => {
      editor.insertCode(a);
      editor.position.set([1, 1]);
    });

    it('adds code to the start of the first line', () => {
      TypeCodeAction.create('-').apply(editor);

      expect(editor.code).toEqual('-123');
      expect(editor.position.values).toEqual([1, 2]);
    });

    it('adds code in the middle of the first line', () => {
      editor.position.set([1, 2]);
      TypeCodeAction.create('-').apply(editor);

      expect(editor.code).toEqual('1-23');
      expect(editor.position.values).toEqual([1, 3]);
    });

    it('adds code to the end of the first line', () => {
      editor.position.set([1, 4]);
      TypeCodeAction.create('-').apply(editor);

      expect(editor.code).toEqual('123-');
      expect(editor.position.values).toEqual([1, 5]);
    });

    it('adds code containing multiple lines in the middle of the first line', () => {
      editor.position.set([1, 2]);
      TypeCodeAction.create('-\n-').apply(editor);

      expect(editor.code).toEqual('1-\n-23');
      expect(editor.position.values).toEqual([2, 2]);
    });
  });

  describe('editor with multiple lines', () => {
    beforeEach(() => {
      editor.insertCode(abc);
      editor.position.set([1, 1]);
    });

    it('adds code containing multiple lines', () => {
      editor.position.set([2, 2]);
      TypeCodeAction.create('-\n-').apply(editor);

      expect(editor.code).toEqual([a, '4-', '-56', c].join('\n'));
      expect(editor.position.values).toEqual([3, 2]);
    });

    it('adds code containing multiple lines at the end', () => {
      editor.position.set([3, 4]);
      TypeCodeAction.create('-\n-').apply(editor);

      expect(editor.code).toEqual([a, b, '789-', '-'].join('\n'));
      expect(editor.position.values).toEqual([4, 2]);
    });
  });
});
