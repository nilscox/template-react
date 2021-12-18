import { EraseCodeActionData, ReplayActionData, TypeCodeActionData } from '../../../domain/Replay';
import { TextEditor } from '../../Editor';
import { Scheduler } from '../../Scheduler';
import { ThunkAction } from '../store';

export const playAction = (action: ReplayActionData): ThunkAction<Promise<void>> => {
  return async (dispatch, getState, { editors, scheduler }) => {
    const playFunc = { TypeCode, EraseCode }[action.type];

    editors.textEditor.focus();
    // @ts-expect-error todo
    await playFunc(action, editors.textEditor, scheduler);
  };
};

const TypeCode = async (action: TypeCodeActionData, editor: TextEditor, scheduler: Scheduler) => {
  if (editor.position[0] !== action.position[0] || editor.position[1] !== action.position[1]) {
    editor.position = action.position;
    await scheduler.wait('afterCursorMovement');
  }

  if (action.prepare.insertLinesAbove > 0 || action.prepare.insertLinesBelow > 0) {
    await editor.insertLinesAbove(action.prepare.insertLinesAbove);
    await editor.insertLinesBelow(action.prepare.insertLinesBelow);
    await scheduler.wait('afterCursorMovement');
  }

  if (scheduler.immediate) {
    editor.insert(action.code);
  } else {
    await editor.type(action.code);
  }
};

const EraseCode = async (action: EraseCodeActionData, editor: TextEditor, scheduler: Scheduler) => {
  editor.position = action.end;
  await scheduler.wait('afterCursorMovement');

  await editor.erase(action.start);
};
