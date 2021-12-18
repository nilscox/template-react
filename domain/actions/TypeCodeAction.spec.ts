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
      TypeCodeAction.create([1, 1], a).apply(editor);

      expect(editor.code).toEqual('123');
      expect(editor.position.values).toEqual([1, 4]);
    });

    it('adds code containing multiple lines', () => {
      TypeCodeAction.create([1, 1], abc).apply(editor);

      expect(editor.code).toEqual(abc);
      expect(editor.position.values).toEqual([3, 4]);
    });
  });

  describe('editor with one line', () => {
    beforeEach(() => {
      editor.insertCode(a);
    });

    it('adds code to the start of the first line', () => {
      TypeCodeAction.create([1, 1], '-').apply(editor);

      expect(editor.code).toEqual('-123');
      expect(editor.position.values).toEqual([1, 2]);
    });

    it('adds code in the middle of the first line', () => {
      TypeCodeAction.create([1, 2], '-').apply(editor);

      expect(editor.code).toEqual('1-23');
      expect(editor.position.values).toEqual([1, 3]);
    });

    it('adds code to the end of the first line', () => {
      TypeCodeAction.create([1, 4], '-').apply(editor);

      expect(editor.code).toEqual('123-');
      expect(editor.position.values).toEqual([1, 5]);
    });

    it('adds code containing multiple lines in the middle of the first line', () => {
      TypeCodeAction.create([1, 2], '-\n-').apply(editor);

      expect(editor.code).toEqual('1-\n-23');
      expect(editor.position.values).toEqual([2, 2]);
    });
  });

  describe('editor with multiple lines', () => {
    beforeEach(() => {
      editor.insertCode(abc);
    });

    it('adds code containing multiple lines', () => {
      TypeCodeAction.create([2, 2], '-\n-').apply(editor);

      expect(editor.code).toEqual([a, '4-', '-56', c].join('\n'));
      expect(editor.position.values).toEqual([3, 2]);
    });

    it('adds code containing multiple lines at the end', () => {
      TypeCodeAction.create([3, 4], '-\n-').apply(editor);

      expect(editor.code).toEqual([a, b, '789-', '-'].join('\n'));
      expect(editor.position.values).toEqual([4, 2]);
    });
  });

  describe('insert lines', () => {
    beforeEach(() => {
      editor.insertCode(abc);
    });

    it('inserts one line above the cursor', () => {
      TypeCodeAction.create([2, 2], '-', { insertLinesAbove: 1 }).apply(editor);

      expect(editor.code).toEqual([a, b, '-', c].join('\n'));
      expect(editor.position.values).toEqual([3, 2]);
    });

    it('inserts two lines above the cursor', () => {
      TypeCodeAction.create([1, 3], '-', { insertLinesAbove: 2 }).apply(editor);

      expect(editor.code).toEqual([a, '', '-', b, c].join('\n'));
      expect(editor.position.values).toEqual([3, 2]);
    });

    it('inserts one line below the cursor', () => {
      TypeCodeAction.create([2, 2], '-', { insertLinesBelow: 1 }).apply(editor);

      expect(editor.code).toEqual([a, '-', b, c].join('\n'));
      expect(editor.position.values).toEqual([2, 2]);
    });

    it('inserts two lines below the cursor', () => {
      TypeCodeAction.create([1, 3], '-', { insertLinesBelow: 2 }).apply(editor);

      expect(editor.code).toEqual(['-', '', a, b, c].join('\n'));
      expect(editor.position.values).toEqual([1, 2]);
    });

    it('inserts lines above and below the cursor', () => {
      TypeCodeAction.create([2, 1], '-', { insertLinesAbove: 1, insertLinesBelow: 2 }).apply(editor);

      expect(editor.code).toEqual([a, b, '-', '', '', c].join('\n'));
      expect(editor.position.values).toEqual([3, 2]);
    });
  });

  it('real example', () => {
    editor.insertCode(`if (a) {\n  return a;\n}`);

    TypeCodeAction.create([1, 1], '  if (b) {\n    return b;\n  }', {
      insertLinesAbove: 1,
      insertLinesBelow: 1,
    }).apply(editor);

    expect(editor.code).toEqual('if (a) {\n  if (b) {\n    return b;\n  }\n\n  return a;\n}');
    expect(editor.position.values).toEqual([4, 4]);
  });
});

/*

123
456
789

*/
