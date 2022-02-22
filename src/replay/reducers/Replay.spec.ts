import { expect } from 'earljs';

import { Replay } from './Replay';

describe('Replay', () => {
  describe('addCommit', () => {
    it('adds a commit to a replay', () => {
      const replay = Replay.create({ commits: [] });

      replay.addCommit({ name: 'new commit', steps: [] });

      expect(replay.props.commits).toBeAnArrayOfLength(1);
      expect(replay.props.commits[0]).toEqual({
        name: 'new commit',
        steps: [],
      });
    });
  });
});
