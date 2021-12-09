import { ChunkAddition, ChunkRemoval } from './Chunk';
import { Replay } from './Replay';

export const testReplay = () => {
  const replay = Replay.create();

  const trim = (str: string) => str.replace(/^[ \n]*\n|[ \n]*$/g, '');
  const lines = (lines: string[]) => lines.join('\n') + '\n';

  const addChunk = (position: number | [number, number], code: string) => {
    if (typeof position === 'number') {
      position = [position, 1];
    }

    replay.addChunk(ChunkAddition.create(position, code));
  };

  const removeChunk = (start: number | [number, number], end: number | [number, number]) => {
    if (typeof start === 'number') {
      start = [start, 1];
    }

    if (typeof end === 'number') {
      end = [end, 1];
    }

    replay.addChunk(ChunkRemoval.create(start, end));
  };

  // 1

  addChunk(1, lines([
    "import { AnyAction } from 'redux';",
    '',
    'const reducer = (state = 0, action: AnyAction): number => {',
    '  return state;',
    '};',
  ]));

  addChunk(4, lines([
    "  if (action.type === 'increment') {",
    '    return state + 1;',
    '  }',
    '',
  ]));

  addChunk([1, 19], ', createStore');

  addChunk(10, lines([
    '',
    'const store = createStore(reducer);',
  ]));

  addChunk(12, lines([
    '',
    '// read the state',
    'console.log(store.getState()); // 0'
  ]));

  addChunk(15, lines([
    '',
    '// update the state',
    'store.dispatch({ type: \'increment\' });'
  ]));

  addChunk(18, lines([
    '',
    '// read the state',
    'console.log(store.getState()); // 1'
  ]));

  // 2

  addChunk(2, lines([
    '',
    'const increment = () => ({',
    '  type: \'increment\',',
    '});'
  ]));

  removeChunk([21, 16], [21, 37]);
  addChunk([21, 16], 'increment()');

  removeChunk(17, 20);

  removeChunk(17, 18);
  removeChunk(18, 20);
  removeChunk(18, [18, 13]);
  removeChunk([18, 17], [18, 18]);

  addChunk(6, lines([
    '',
    'const incrementByAmount = (amount: number) => ({',
    '  type: \'incrementByAmount\',',
    '  amount,',
    '});',
  ]));

  addChunk(16, lines([
    '',
    '  if (action.type === \'incrementByAmount\') {',
    '    return state + action.amount;',
    '  }',
  ]));

  addChunk(28, lines([
    '',
    'store.dispatch(incrementByAmount(5));',
    'store.getState(); // 6',
  ]));

  // 3

  addChunk(2, lines([
    '',
    'type IncrementAction = {',
    '  type: \'increment\';',
    '};',
  ]));

  addChunk([7, 21], ': IncrementAction');

  addChunk(10, lines([
    '',
    'type IncrementByAmountAction = {',
    '  type: \'incrementByAmount\';',
    '  amount: number;',
    '};',
  ]));

  addChunk([16, 43], ': IncrementByAmountAction');

  addChunk(20, lines([
    '',
    'type AppAction = IncrementAction | IncrementByAmountAction;'
  ]));

  removeChunk([23, 37], [23, 46]);
  addChunk([23, 37], 'AppAction');

  removeChunk([1, 10], [1, 21]);

  // 4

  addChunk(2, lines([
    '',
    'type Action<Type extends string, Payload> = { type: Type } & Payload;',
  ]))

  addChunk(4, lines([
    '',
    'function createAction<Type extends string, Payload>(type: Type, payload?: Payload): Action<Type, Payload> {',
    '  return { type, ...payload } as Action<Type, Payload>;',
    '}',
  ]))

  removeChunk([13, 21], [15, 3]);
  addChunk([13, 21], [
    ' => {',
    '  return createAction(\'increment\');',
    '}',
  ].join('\n'));

  removeChunk([22, 43], [25, 3]);
  addChunk([22, 43], [
    ' => {',
    '  return createAction(\'incrementByAmount\', { amount });',
    '}',
  ].join('\n'));

  removeChunk(8, 12);
  removeChunk(12, 17);

  removeChunk([17, 18], [17, 59]);
  addChunk([17, 18], 'ReturnType<typeof increment | typeof incrementByAmount>');

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
