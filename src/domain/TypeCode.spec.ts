import { expect } from 'earljs';

import { CursorPosition } from './CursorPosition';
import { TypeCodeAction } from './TypeCode';

describe('TypeCode', () => {
  it('applies a TypeCode action', () => {
    const apply = (initialCode: string, [line, column]: [number, number], chunkCode: string) => {
      return new TypeCodeAction(new CursorPosition(line, column), chunkCode).apply(initialCode);
    };

    expect(apply('beautiful code', [1, 1], 'some ')).toEqual('some beautiful code');
    expect(apply('some code', [1, 5], ' beautiful')).toEqual('some beautiful code');
    expect(apply('some beautiful', [1, 15], ' code')).toEqual('some beautiful code');

    expect(apply(['this is', 'some code', "isn't it?"].join('\n'), [2, 5], ' beautiful')).toEqual(
      ['this is', 'some beautiful code', "isn't it?"].join('\n'),
    );
  });

  it('adds lines above the inserted code', () => {
    const action = new TypeCodeAction(new CursorPosition(1, 2), 'code');
    const initialCode = ['abc', 'def'].join('\n');

    action.prepare.insertLinesAbove = 2;

    expect(action.apply(initialCode)).toEqual(['abc', '', 'code', 'def'].join('\n'));
  });

  it('adds lines below the inserted code', () => {
    const action = new TypeCodeAction(new CursorPosition(2, 2), 'code');
    const initialCode = ['abc', 'def'].join('\n');

    action.prepare.insertLinesBelow = 2;

    expect(action.apply(initialCode)).toEqual(['abc', 'code', '', 'def'].join('\n'));
  });
});
