import { expect } from 'earljs';

import { ActionType, ReplayCommitData } from '../../../domain/types';
import { createStore, Store } from '../store';

import {
  selectCommits,
  selectCurrentCommit,
  selectCurrentStep,
  selectFinalState,
  selectInitialState,
} from './replay.selectors';
import {
  addCommit,
  addStep,
  loadReplay,
  setCurrentCommitIndex,
  setCurrentCommitName,
  setCurrentStepIndex,
} from './replay.slice';

describe.skip('replay slice', () => {
  const commit: ReplayCommitData = {
    name: 'commit',
    steps: [
      {
        name: 'step',
        actions: [
          {
            type: ActionType.TypeCode,
            code: 'hello',
          },
        ],
      },
    ],
  };

  const clone = <T>(object: unknown): T => {
    return JSON.parse(JSON.stringify(object));
  };

  let store: Store;

  beforeEach(() => {
    store = createStore();
    store.dispatch(loadReplay([clone(commit)]));
  });

  it('loads a replay', () => {
    expect(selectInitialState(store.getState())).toEqual({
      code: '',
      position: [1, 1],
    });

    expect(selectFinalState(store.getState())).toEqual({
      code: 'hello',
      position: [1, 6],
    });
  });

  it('adds a commit to a replay', () => {
    store.dispatch(addCommit());

    expect(selectCommits(store.getState())).toBeAnArrayOfLength(2);
  });

  it("update the current commit's name", () => {
    store.dispatch(setCurrentCommitName('current commit'));

    expect(selectCurrentCommit(store.getState())?.name).toEqual('current commit');
  });

  it('adds a step to the current commit', () => {
    store.dispatch(addStep());

    store.dispatch(setCurrentStepIndex(1));

    expect(selectCurrentStep(store.getState())).toEqual({
      name: '',
      actions: [],
      initialState: { code: 'hello', position: [1, 6] },
      finalState: { code: 'hello', position: [1, 6] },
    });
  });

  it('adds a step to a commit having no step', () => {
    store.dispatch(addCommit());
    store.dispatch(setCurrentCommitIndex(1));

    store.dispatch(addStep());

    store.dispatch(setCurrentStepIndex(0));

    expect(selectCurrentStep(store.getState())).toEqual({
      name: '',
      actions: [],
      initialState: { code: 'hello', position: [1, 6] },
      finalState: { code: 'hello', position: [1, 6] },
    });
  });
});
