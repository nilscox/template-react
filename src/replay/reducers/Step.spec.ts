import { expect } from 'earljs';

import { Step } from './Step';

describe.only('Step', () => {
  describe('add action', () => {
    it('adds an action to a step', () => {
      const step = Step.create();

      step.addAction({ type: 'TypeCode', code: 'code' });

      expect(step.props.actions).toBeAnArrayOfLength(1);

      expect(step.props.actions[0]).toEqual({
        type: 'TypeCode',
        code: 'code',
      });

      expect(step.props.initialState).toEqual({
        code: '',
        position: [1, 1],
      });

      expect(step.props.finalState).toEqual({
        code: 'code',
        position: [1, 5],
      });
    });
  });
});
