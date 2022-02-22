import { expect } from 'earljs';

import { TypeCodeAction } from '../replay.slice';

import { Step } from './Step';

describe('Step', () => {
  describe('insert action', () => {
    const createTypeCode = (code: string): TypeCodeAction => ({ type: 'TypeCode', code });

    it('inserts actions to a step', () => {
      const step = Step.create();

      step.insertAction(0, createTypeCode('a'));
      step.insertAction(0, createTypeCode('b'));

      expect(step.props.actions).toBeAnArrayOfLength(2);

      expect(step.props.actions[0]).toEqual({
        type: 'TypeCode',
        code: 'b',
      });

      expect(step.props.actions[1]).toEqual({
        type: 'TypeCode',
        code: 'a',
      });
    });
  });
});
