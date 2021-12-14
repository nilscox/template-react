import { Editor } from '../../Editor';
import { Scheduler } from '../../Scheduler';
import { ThunkAction } from '../store';
import { EraseCodeAction, ReplayAction, TypeCodeAction } from '../types/entities';

export const playAction = (action: ReplayAction): ThunkAction => {
  return async (dispatch, getState, { editor, scheduler }) => {
    const playFunc = { TypeCode, EraseCode }[action.type];

    editor.focus();
    await playFunc(action as any, editor, scheduler);
    await scheduler.wait('betweenActions');
  };
};

const TypeCode = async (action: TypeCodeAction, editor: Editor, scheduler: Scheduler) => {
  editor.position = action.position;

  await editor.insertLinesAbove(action.prepare.insertLinesAbove);
  await editor.insertLinesBelow(action.prepare.insertLinesBelow);

  await scheduler.wait('afterCursorMovement');

  if (scheduler.immediate) {
    editor.insert(action.code);
  } else {
    await editor.type(action.code);
  }
};

const EraseCode = async (action: EraseCodeAction, editor: Editor, scheduler: Scheduler) => {
  editor.position = action.end;
  await scheduler.wait('afterCursorMovement');

  await editor.erase(action.start);
};

// const playAction = async (action: ReplayAction, editor: Editor, scheduler: Scheduler) => {
//   switch (action.type) {

//     case 'InsertLines':
//       editor.position = action.position;
//       await scheduler.wait('afterCursorMovement');

//       await editor.insertLinesAbove(action.insertLinesAbove);
//       await editor.insertLinesBelow(action.insertLinesBelow);

//       break;

//     case 'SetCursorPosition':
//       editor.position = action.position;
//       break;

//     case 'AddSelections':
//       editor.selections = action.ranges.map(([start, end]) => new Range(start, end));
//       break;

//     case 'DeleteSelection':
//       editor.backspace();
//       editor.clearMultiCursor();
//       break;
//   }
// };
