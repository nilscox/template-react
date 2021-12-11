import { CursorPosition } from './CursorPosition';
import { ReplayBuilder } from './ReplayBuilder';

export const testReplay = () => {
  const lines = (lines: string[]) => lines.join('\n');

  const position = (line: number, column?: number) => {
    return new CursorPosition(line, column);
  };

  const builder = new ReplayBuilder();

  // 1

  builder.typeCode(position(1), lines([
    "import { AnyAction } from 'redux';",
    '',
    'const reducer = (state = 0, action: AnyAction): number => {',
    '  return state;',
    '};',
    ''
  ]));

  builder.typeCode(position(4), lines([
    "  if (action.type === 'increment') {",
    '    return state + 1;',
    '  }',
  ]), { insertLinesAfter: 2  });

  builder.typeCode(position(1, 19), ', createStore');

  builder.typeCode(position(10), lines([
    '',
    'const store = createStore(reducer);',
    '',
  ]));

  builder.typeCode(position(12), lines([
    '',
    '// read the state',
    'console.log(store.getState()); // 0',
    '',
  ]));

  builder.typeCode(position(15), lines([
    '',
    '// update the state',
    'store.dispatch({ type: \'increment\' });',
    '',
  ]));

  builder.typeCode(position(18), lines([
    '',
    '// read the state',
    'console.log(store.getState()); // 1',
    ''
  ]));

  // 2

  builder.typeCode(position(2), lines([
    '',
    'const increment = () => ({',
    '  type: \'increment\',',
    '});',
  ]), { insertLinesAfter: 1 });

  builder.eraseCode(position(21, 16), position(21, 37));
  builder.typeCode(position(21, 16), 'increment()');

  builder.addSelections([
    [position(17, 1), position(21, 1)],
    [position(22, 1), position(24, 1)],
    [position(24, 1), position(24, 13)],
    [position(24, 29), position(24, 30)],
  ]);

  builder.deleteSelection();

  builder.typeCode(position(6), lines([
    'const incrementByAmount = (amount: number) => ({',
    '  type: \'incrementByAmount\',',
    '  amount,',
    '});',
  ]), { insertLinesBefore: 1, insertLinesAfter: 1 });

  builder.typeCode(position(16), lines([
    '  if (action.type === \'incrementByAmount\') {',
    '    return state + action.amount;',
    '  }',
  ]), { insertLinesBefore: 1, insertLinesAfter: 1 });

  builder.typeCode(position(28), lines([
    '',
    'store.dispatch(incrementByAmount(5));',
    'store.getState(); // 6',
  ]), { insertLinesAfter: 1 });

  // 3

  builder.typeCode(position(2), lines([
    '',
    'type IncrementAction = {',
    '  type: \'increment\';',
    '};',
  ]), { insertLinesAfter: 1 });

  builder.typeCode(position(7, 21), ': IncrementAction');

  builder.typeCode(position(10), lines([
    '',
    'type IncrementByAmountAction = {',
    '  type: \'incrementByAmount\';',
    '  amount: number;',
    '};',
  ]), { insertLinesAfter: 1 });

  builder.typeCode(position(16, 43), ': IncrementByAmountAction');

  builder.typeCode(position(20), lines([
    '',
    'type AppAction = IncrementAction | IncrementByAmountAction;'
  ]), { insertLinesAfter: 1 });

  builder.eraseCode(position(23, 37), position(23, 46));
  builder.typeCode(position(23, 37), 'AppAction');

  builder.eraseCode(position(1, 10), position(1, 21));

  // 4

  builder.typeCode(position(2), lines([
    '',
    'type Action<Type extends string, Payload> = { type: Type } & Payload;',
  ]), { insertLinesAfter: 1 });

  builder.typeCode(position(4), lines([
    '',
    'function createAction<Type extends string, Payload>(type: Type, payload?: Payload): Action<Type, Payload> {',
    '  return { type, ...payload } as Action<Type, Payload>;',
    '}',
  ]), { insertLinesAfter: 1 });

  builder.eraseCode(position(13, 21), position(15, 3));
  builder.typeCode(position(13, 21), lines([
    ' => {',
    '  return createAction(\'increment\');',
    '}',
  ]));

  builder.eraseCode(position(22, 43), position(25, 3));
  builder.typeCode(position(22, 43), lines([
    ' => {',
    '  return createAction(\'incrementByAmount\', { amount });',
    '}',
  ]));

  builder.addSelections([[position(8), position(12)]]);
  builder.deleteSelection();

  builder.addSelections([[position(12), position(17)]]);
  builder.deleteSelection();

  builder.eraseCode(position(17, 18), position(17, 59));
  builder.typeCode(position(17, 18), 'ReturnType<typeof increment | typeof incrementByAmount>');

  return builder.get();
};

// console.log(inspect(testReplay().toJson(), false, null, true));
