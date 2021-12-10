import { expect } from 'earljs';

import { ChunkAddition, ChunkRemoval } from './Chunk';
import { Replay } from './Replay';

describe('Replay', () => {
  it('creates an replay', () => {
    const chunk = ChunkAddition.create(1, 'code');
    const replay = Replay.create([chunk]);

    expect(replay.actions).toEqual([chunk]);
  });

  const chunk1 = ChunkAddition.create(1, 'hello');
  const chunk2 = ChunkAddition.create([1, 6], ' the world');
  const chunk3 = ChunkRemoval.create([1, 6], [1, 10]);

  it('adds chunks to a replay', () => {
    const replay = Replay.create([chunk1]);

    expect(replay.code).toEqual('hello');

    replay.addChunk(chunk2);
    replay.nextAction();
    expect(replay.code).toEqual('hello the world');

    replay.addChunk(chunk3);
    replay.nextAction();
    expect(replay.code).toEqual('hello world');
  });

  it("retrieves a replay's current cursor position", () => {
    const replay = Replay.create([chunk1, chunk2, chunk3]);

    expect(replay.cursorPosition).toEqual([1, 6]);

    replay.reset();
    expect(replay.cursorPosition).toEqual([1, 1]);
    expect(replay.nextCursorPosition).toEqual([1, 6]);

    replay.nextAction();
    expect(replay.cursorPosition).toEqual([1, 6]);
    expect(replay.nextCursorPosition).toEqual([1, 16]);

    replay.nextAction();
    expect(replay.cursorPosition).toEqual([1, 10]);
    expect(replay.nextCursorPosition).toEqual([1, 6]);

    replay.nextAction();
    expect(replay.cursorPosition).toEqual([1, 6]);
    expect(replay.nextCursorPosition).toEqual(undefined);
  });

  it("computes a replay's current progress", () => {
    const chunk = ChunkAddition.create([0, 0], 'hello');
    const replay = Replay.create([chunk, chunk, chunk]);

    expect(replay.progress).toEqual(1);

    replay.reset();
    expect(replay.progress).toEqual(0);

    replay.nextAction();
    expect(replay.progress).toEqual(1 / 3);

    replay.nextAction();
    expect(replay.progress).toEqual(2 / 3);

    replay.nextAction();
    expect(replay.progress).toEqual(3 / 3);
  });

  it('plays a code replay', () => {
    const replay = Replay.create([chunk1, chunk2, chunk3]);

    expect(replay.code).toEqual('hello world');

    replay.reset();
    expect(replay.code).toEqual('');

    replay.nextAction();
    expect(replay.code).toEqual('hello');

    replay.nextAction();
    expect(replay.code).toEqual('hello the world');

    replay.nextAction();
    expect(replay.code).toEqual('hello world');

    expect(() => replay.nextAction()).toThrow();
  });
});
