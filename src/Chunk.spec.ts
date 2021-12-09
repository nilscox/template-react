import { expect } from 'earljs';

import { ChunkAddition, ChunkRemoval } from './Chunk';

describe('ChunkAddition', () => {
  it('creates a addition chunk of code on the first line', () => {
    const chunk = ChunkAddition.create(1, 'hello');

    expect(chunk.code).toEqual('hello');
    expect(chunk.line).toEqual(0);
    expect(chunk.column).toEqual(0);
  });

  it('creates a chunk of code on the second line sixth column', () => {
    const chunk = ChunkAddition.create([2, 6], 'hello');

    expect(chunk.code).toEqual('hello');
    expect(chunk.line).toEqual(1);
    expect(chunk.column).toEqual(5);
  });

  it('fails to create a code chunk when the code is an empty string', () => {
    expect(() => ChunkAddition.create(1, '')).toThrow();
  });

  it("retrieves a chunk addition's initial cursor position", () => {
    expect(ChunkAddition.create([1, 2], 'code').initialCursorPosition).toEqual([1, 2]);
  });

  it("retrieves a chunk addition's final cursor position", () => {
    expect(ChunkAddition.create([1, 2], 'code').finalCursorPosition).toEqual([1, 6]);
    expect(ChunkAddition.create([1, 2], 'some\ncode').finalCursorPosition).toEqual([2, 4]);
  });

  it('applies a chunk adding code', () => {
    const apply = (initialCode: string, position: [number, number], chunkCode: string) => {
      return ChunkAddition.create(position, chunkCode).apply(initialCode);
    };

    expect(apply('beautiful code', [1, 1], 'some ')).toEqual('some beautiful code');
    expect(apply('some code', [1, 5], ' beautiful')).toEqual('some beautiful code');
    expect(apply('some beautiful', [1, 15], ' code')).toEqual('some beautiful code');

    expect(apply(['this is', 'some code', "isn't it?"].join('\n'), [2, 5], ' beautiful')).toEqual(
      ['this is', 'some beautiful code', "isn't it?"].join('\n'),
    );
  });
});

describe('ChunkRemoval', () => {
  it('creates a chunk removing the first line', () => {
    const chunk = ChunkRemoval.create(1, 2);

    expect(chunk.startLine).toEqual(0);
    expect(chunk.startColumn).toEqual(0);

    expect(chunk.endLine).toEqual(1);
    expect(chunk.endColumn).toEqual(0);
  });

  it('creates a chunk removing a chunk of code', () => {
    const chunk = ChunkRemoval.create([2, 6], [4, 8]);

    expect(chunk.startLine).toEqual(1);
    expect(chunk.startColumn).toEqual(5);

    expect(chunk.endLine).toEqual(3);
    expect(chunk.endColumn).toEqual(7);
  });

  it('fails to create a code chunk when the first position is after the end position', () => {
    expect(() => ChunkRemoval.create(2, 1)).toThrow();
    expect(() => ChunkRemoval.create([2, 2], [2, 1])).toThrow();
    expect(() => ChunkRemoval.create([2, 2], [2, 2])).toThrow();
  });

  it("retrieves a chunk removal's initial cursor position", () => {
    expect(ChunkRemoval.create([1, 2], [3, 4]).initialCursorPosition).toEqual([3, 4]);
  });

  it("retrieves a chunk removal's final cursor position", () => {
    expect(ChunkRemoval.create([1, 2], [3, 4]).finalCursorPosition).toEqual([1, 2]);
  });

  it('applies a chunk removing code', () => {
    const apply = (initialCode: string, start: [number, number], end: [number, number]) => {
      return ChunkRemoval.create(start, end).apply(initialCode);
    };

    expect(apply('some horrible code', [1, 5], [1, 14])).toEqual('some code');

    expect(apply(['this is', 'some horrible code', 'yes, code'].join('\n'), [2, 5], [3, 5])).toEqual(
      ['this is', 'some code'].join('\n'),
    );
  });
});
