import { expect } from 'earljs';

import { Commit } from './Commit';

describe('Commit', () => {
  describe('set name', () => {
    it("updates a commit's name", () => {
      const commit = Commit.create();

      commit.setName('new name');

      expect(commit.props.name).toEqual('new name');
    });
  });

  describe('insert step', () => {
    it('inserts steps to a commit', () => {
      const commit = Commit.create();

      commit.insertStep(0, { name: 'new step 1', actions: [] });
      commit.insertStep(0, { name: 'new step 2', actions: [] });

      expect(commit.props.steps).toBeAnArrayOfLength(2);

      expect(commit.props.steps[0]).toEqual({
        name: 'new step 2',
        actions: [],
        initialState: { code: '', position: [1, 1] },
        finalState: { code: '', position: [1, 1] },
      });

      expect(commit.props.steps[1]).toEqual({
        name: 'new step 1',
        actions: [],
        initialState: { code: '', position: [1, 1] },
        finalState: { code: '', position: [1, 1] },
      });
    });
  });
});
