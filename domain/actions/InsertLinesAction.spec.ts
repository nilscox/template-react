import { expect } from 'earljs';

import { MemoryEditor } from '../MemoryEditor';

import { InsertLinesAction } from './InsertLinesAction';

describe('InsertLinesAction', () => {
  const a = '123';
  const b = '456';
  const c = '789';

  const abc = [a, b, c].join('\n');

  let editor: MemoryEditor;

  beforeEach(() => {
    editor = new MemoryEditor();
  });

  describe('empty editor', () => {
    it('insert one line above the cursor into an empty editor', () => {
      InsertLinesAction.create({ above: 1 }).apply(editor);

      expect(editor.code).toEqual('\n');
      expect(editor.position.values).toEqual([2, 1]);
    });

    it('insert two lines below the cursor into an empty editor', () => {
      InsertLinesAction.create({ below: 2 }).apply(editor);

      expect(editor.code).toEqual('\n\n');
      expect(editor.position.values).toEqual([1, 1]);
    });

    it('insert lines above and below the cursor into an empty editor', () => {
      InsertLinesAction.create({ above: 2, below: 1 }).apply(editor);

      expect(editor.code).toEqual('\n\n\n');
      expect(editor.position.values).toEqual([3, 1]);
    });
  });

  describe('editor containing code', () => {
    beforeEach(() => {
      editor.insertCode(abc);
      editor.position.line = 2;
      editor.position.column = 2;
    });

    it('inserts two lines above the cursor', () => {
      InsertLinesAction.create({ above: 2 }).apply(editor);

      expect(editor.code).toEqual([a, b, '', '', c].join('\n'));
      expect(editor.position.values).toEqual([4, 1]);
    });

    it('inserts one line below the cursor', () => {
      InsertLinesAction.create({ below: 1 }).apply(editor);

      expect(editor.code).toEqual([a, '', b, c].join('\n'));
      expect(editor.position.values).toEqual([2, 1]);
    });

    it('inserts lines above and below the cursor', () => {
      InsertLinesAction.create({ above: 1, below: 2 }).apply(editor);

      expect(editor.code).toEqual([a, b, '', '', '', c].join('\n'));
      expect(editor.position.values).toEqual([3, 1]);
    });
  });
});
