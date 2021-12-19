import { expect } from 'earljs';

import { PositionData, Replay, ReplayActionData, ReplayStepData, TypeCodeActionData } from './Replay';

describe('Replay', () => {
  it('applies one action', () => {
    const action1: TypeCodeActionData = {
      type: 'TypeCode',
      code: 'hello',
    };

    const replay = Replay.create([{ name: 'step', actions: [action1] }]);

    const playedSteps = replay.play();

    expect(playedSteps).toEqual([
      {
        name: 'step',
        initialState: {
          code: '',
          position: [1, 1],
        },
        finalState: {
          code: 'hello',
          position: [1, 6],
        },
        actions: [
          {
            type: 'TypeCode',
            code: 'hello',
          },
        ],
      },
    ]);
  });

  const action1: ReplayActionData = {
    type: 'TypeCode',
    code: 'hello',
  };

  const action2: ReplayActionData = {
    type: 'TypeCode',
    code: ' the world',
  };

  const action3: ReplayActionData = {
    type: 'MoveCursor',
    position: [1, 10],
  };

  const action4: ReplayActionData = {
    type: 'EraseCode',
    end: [1, 6],
  };

  const actions = [action1, action2, action3, action4];

  const state = (code: string, position: PositionData) => ({
    code,
    position,
  });

  it('applies multiple actions in a single step', () => {
    const replay = Replay.create([{ name: 'step', actions }]);
    const playedSteps = replay.play();

    expect(playedSteps).toEqual([
      {
        name: 'step',
        actions,
        initialState: state('', [1, 1]),
        finalState: state('hello world', [1, 6]),
      },
    ]);
  });

  it('applies multiple steps', () => {
    const steps: ReplayStepData[] = actions.map((action, n) => ({ name: `step ${n + 1}`, actions: [action] }));
    const replay = Replay.create(steps);
    const playedSteps = replay.play();

    expect(playedSteps).toBeAnArrayOfLength(4);

    expect(playedSteps[0]).toEqual({
      name: 'step 1',
      actions: [action1],
      initialState: state('', [1, 1]),
      finalState: state('hello', [1, 6]),
    });

    expect(playedSteps[1]).toEqual({
      name: 'step 2',
      actions: [action2],
      initialState: state('hello', [1, 6]),
      finalState: state('hello the world', [1, 16]),
    });

    expect(playedSteps[2]).toEqual({
      name: 'step 3',
      actions: [action3],
      initialState: state('hello the world', [1, 16]),
      finalState: state('hello the world', [1, 10]),
    });

    expect(playedSteps[3]).toEqual({
      name: 'step 4',
      actions: [action4],
      initialState: state('hello the world', [1, 10]),
      finalState: state('hello world', [1, 6]),
    });
  });
});
