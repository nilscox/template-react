import { AddSelections } from './actions/AddSelections';
import { DeleteSelection } from './actions/DeleteSelection';
import { EraseCode } from './actions/EraseCode';
import { InsertLinesAbove } from './actions/InsertLinesAbove';
import { TypeCode } from './actions/TypeCode';
import { Replay } from './Replay';
import { ReplayAction } from './ReplayAction';

export const testReplay = () => {
  const replay = Replay.create();

  const lines = (lines: string[]) => lines.join('\n');

  const helper = <Action extends { create(...args: any[]): ReplayAction }>(action: Action) => {
    return (...args: Parameters<Action['create']>) => {
      replay.addAction(action.create(...args));
    };
  };

  const typeCode = helper(TypeCode);
  const eraseCode = helper(EraseCode);
  const insertLinesAbove = helper(InsertLinesAbove);
  const addSelections = helper(AddSelections);
  const deleteSelection = helper(DeleteSelection);

  // 1

  typeCode(1, lines([
    "import { AnyAction } from 'redux';",
    '',
    'const reducer = (state = 0, action: AnyAction): number => {',
    '  return state;',
    '};',
    ''
  ]));

  insertLinesAbove(4, 2);

  typeCode(4, lines([
    "  if (action.type === 'increment') {",
    '    return state + 1;',
    '  }',
  ]));

  typeCode([1, 19], ', createStore');

  typeCode(10, lines([
    '',
    'const store = createStore(reducer);',
    ''
  ]));

  typeCode(12, lines([
    '',
    '// read the state',
    'console.log(store.getState()); // 0',
    ''
  ]));


  typeCode(15, lines([
    '',
    '// update the state',
    'store.dispatch({ type: \'increment\' });',
    ''
  ]));

  typeCode(18, lines([
    '',
    '// read the state',
    'console.log(store.getState()); // 1',
    ''
  ]));

  // 2

  insertLinesAbove(2, 1);

  typeCode(2, lines([
    '',
    'const increment = () => ({',
    '  type: \'increment\',',
    '});',
  ]));

  eraseCode([21, 16], [21, 37]);
  typeCode([21, 16], 'increment()');

  addSelections([
    [[17, 1], [21, 1]],
    [[22, 1], [24, 1]],
    [[24, 1], [24, 13]],
    [[24, 29], [24, 30]],
  ]);

  deleteSelection();

  typeCode(6, lines([
    '',
    'const incrementByAmount = (amount: number) => ({',
    '  type: \'incrementByAmount\',',
    '  amount,',
    '});',
    '',
  ]));

  insertLinesAbove(17, 2);

  typeCode(16, lines([
    '  if (action.type === \'incrementByAmount\') {',
    '    return state + action.amount;',
    '  }',
  ]));

  return replay;

  typeCode(28, lines([
    '',
    'store.dispatch(incrementByAmount(5));',
    'store.getState(); // 6',
  ]));

  // 3

  typeCode(2, lines([
    '',
    'type IncrementAction = {',
    '  type: \'increment\';',
    '};',
  ]));

  typeCode([7, 21], ': IncrementAction');

  typeCode(10, lines([
    '',
    'type IncrementByAmountAction = {',
    '  type: \'incrementByAmount\';',
    '  amount: number;',
    '};',
  ]));

  typeCode([16, 43], ': IncrementByAmountAction');

  typeCode(20, lines([
    '',
    'type AppAction = IncrementAction | IncrementByAmountAction;'
  ]));

  eraseCode([23, 37], [23, 46]);
  typeCode([23, 37], 'AppAction');

  eraseCode([1, 10], [1, 21]);

  // 4

  typeCode(2, lines([
    '',
    'type Action<Type extends string, Payload> = { type: Type } & Payload;',
  ]))

  typeCode(4, lines([
    '',
    'function createAction<Type extends string, Payload>(type: Type, payload?: Payload): Action<Type, Payload> {',
    '  return { type, ...payload } as Action<Type, Payload>;',
    '}',
  ]))

  eraseCode([13, 21], [15, 3]);
  typeCode([13, 21], [
    ' => {',
    '  return createAction(\'increment\');',
    '}',
  ].join('\n'));

  eraseCode([22, 43], [25, 3]);
  typeCode([22, 43], [
    ' => {',
    '  return createAction(\'incrementByAmount\', { amount });',
    '}',
  ].join('\n'));

  eraseCode(8, 12);
  eraseCode(12, 17);

  eraseCode([17, 18], [17, 59]);
  typeCode([17, 18], 'ReturnType<typeof increment | typeof incrementByAmount>');

  return replay;
};

// const main = async () => {
//   testReplay.reset();

//   while (testReplay.progress < 1) {
//     testReplay.nextChunk();
//     await new Promise(r => setTimeout(r, 100));
//     process.stdout.write('\x1Bc');
//     console.log(testReplay.code);
//   }
// };

// main().catch(console.error);

// console.log(replay.code);
// require('fs').writeFileSync('/tmp/out.ts', replay.code);

// console.log(replay.code.split('\n').length);
// console.log(replay.code.replace(/\n/g, '$\n'));
