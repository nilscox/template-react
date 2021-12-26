import { expect } from 'earljs';

import { Commit } from './Commit';

describe.only('Commit', () => {
  describe('set name', () => {
    it("updates a commit's name", () => {
      const commit = Commit.create();

      commit.setName('new name');

      expect(commit.props.name).toEqual('new name');
    });
  });

  describe('add step', () => {
    it('adds a first step to a commit', () => {
      const commit = Commit.create();

      commit.addStep({ name: 'new step', actions: [] });

      expect(commit.props.steps).toBeAnArrayOfLength(1);

      expect(commit.props.steps[0]).toEqual({
        name: 'new step',
        actions: [],
        initialState: { code: '', position: [1, 1] },
        finalState: { code: '', position: [1, 1] },
      });
    });
  });
});
