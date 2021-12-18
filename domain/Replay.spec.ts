import { expect } from 'earljs';

import { EraseCodeActionData, Replay, TypeCodeActionData } from './Replay';

describe('Replay', () => {
  const defaultPrepare: TypeCodeActionData['prepare'] = {
    insertLinesAbove: 0,
    insertLinesBelow: 0,
  };

  it('applies one action', () => {
    const action1: TypeCodeActionData = {
      type: 'TypeCode',
      code: 'hello',
      position: [1, 1],
      prepare: defaultPrepare,
    };

    const replay = Replay.create([action1]);

    const playedActions = replay.play();

    expect(playedActions).toEqual([
      {
        type: 'TypeCode',
        code: 'hello',
        position: [1, 1],
        initialCode: '',
        initialPosition: [1, 1],
        finalCode: 'hello',
        finalPosition: [1, 6],
        prepare: defaultPrepare,
      },
    ]);
  });

  it('applies multiple actions', () => {
    const action1: TypeCodeActionData = {
      type: 'TypeCode',
      code: 'hello',
      position: [1, 1],
      prepare: defaultPrepare,
    };

    const action2: TypeCodeActionData = {
      type: 'TypeCode',
      code: ' the world',
      position: [1, 6],
      prepare: defaultPrepare,
    };

    const action3: EraseCodeActionData = {
      type: 'EraseCode',
      start: [1, 6],
      end: [1, 10],
    };

    const replay = Replay.create([action1, action2, action3]);

    const playedActions = replay.play();

    expect(playedActions).toEqual([
      {
        type: 'TypeCode',
        code: 'hello',
        position: [1, 1],
        initialCode: '',
        initialPosition: [1, 1],
        finalCode: 'hello',
        finalPosition: [1, 6],
        prepare: defaultPrepare,
      },
      {
        type: 'TypeCode',
        code: ' the world',
        position: [1, 6],
        initialCode: 'hello',
        initialPosition: [1, 6],
        finalCode: 'hello the world',
        finalPosition: [1, 16],
        prepare: defaultPrepare,
      },
      {
        type: 'EraseCode',
        start: [1, 6],
        end: [1, 10],
        initialCode: 'hello the world',
        initialPosition: [1, 16],
        finalCode: 'hello world',
        finalPosition: [1, 6],
      },
    ]);
  });
});
