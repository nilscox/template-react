import { expect } from 'earljs';

import { Replay } from './Replay';
import {
  ActionType,
  PlayedCommitData,
  PlayedStepData,
  ReplayCommitData,
  ReplayStepData,
  TypeCodeActionData,
} from './types';

describe('Replay', () => {
  it('creates an empty replay', () => {
    const replay = Replay.create([]);

    expect(replay.data).toEqual({ commits: [] });
  });

  it('creates a replay containing one commit', () => {
    const action: TypeCodeActionData = {
      type: ActionType.TypeCode,
      code: 'hello',
    };

    const step: ReplayStepData = {
      name: 'step',
      actions: [action],
    };

    const commit: ReplayCommitData = {
      name: 'commit',
      steps: [step],
    };

    const replay = Replay.create([commit]);

    const expectedStep: PlayedStepData = {
      name: 'step',
      initialState: { code: '', position: [1, 1] },
      finalState: { code: 'hello', position: [1, 6] },
      actions: [action],
    };

    const expectedCommit: PlayedCommitData = {
      name: 'commit',
      steps: [expectedStep],
    };

    expect(replay.data).toEqual({ commits: [expectedCommit] });
  });
});
