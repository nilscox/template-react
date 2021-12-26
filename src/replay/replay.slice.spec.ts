import { expect } from 'earljs';

import { createStore, Store } from '../store/store';

import { selectReplay } from './replay.selectors';
import { addCommit, CommitData, loadReplay, ReplayAction, StepData } from './replay.slice';

describe.only('replay slice', () => {
  let store: Store;

  beforeEach(() => {
    store = createStore();
  });

  describe('initialization', () => {
    it('initializes with an empty replay', () => {
      expect(selectReplay(store.getState())).toEqual({
        commits: [],
      });
    });
  });

  describe('load replay', () => {
    it('loads an empty replay', () => {
      store.dispatch(loadReplay({ commits: [] }));

      expect(selectReplay(store.getState())).toEqual({
        commits: [],
      });
    });

    it('loads a replay containing one commit', () => {
      const commit: CommitData = { name: 'commit 1', steps: [] };

      store.dispatch(loadReplay({ commits: [commit] }));

      expect(selectReplay(store.getState())).toEqual({
        commits: [
          {
            name: 'commit 1',
            steps: [],
          },
        ],
      });
    });

    it('loads a replay containing one step', () => {
      const step: StepData = { name: 'step 1', actions: [] };
      const commit: CommitData = { name: 'commit 1', steps: [step] };

      store.dispatch(loadReplay({ commits: [commit] }));

      expect(selectReplay(store.getState())).toEqual({
        commits: [
          {
            name: 'commit 1',
            steps: [
              {
                name: 'step 1',
                actions: [],
                initialState: { code: '', position: [1, 1] },
                finalState: { code: '', position: [1, 1] },
              },
            ],
          },
        ],
      });
    });

    it('loads a replay containing one action', () => {
      const action: ReplayAction = { type: 'TypeCode', code: 'code' };
      const step: StepData = { name: 'step 1', actions: [action] };
      const commit: CommitData = { name: 'commit 1', steps: [step] };

      store.dispatch(loadReplay({ commits: [commit] }));

      expect(selectReplay(store.getState())).toEqual({
        commits: [
          {
            ...commit,
            steps: [
              {
                ...step,
                initialState: { code: '', position: [1, 1] },
                finalState: { code: 'code', position: [1, 5] },
              },
            ],
          },
        ],
      });
    });
  });

  describe('add commit', () => {
    it('adds a commit to a replay', () => {
      store.dispatch(addCommit({ name: 'new commit', steps: [] }));

      expect(selectReplay(store.getState()).commits).toBeAnArrayOfLength(1);
    });
  });
});
