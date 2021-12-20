import {
  EraseCodeActionData,
  InsertLinesActionData,
  MoveCursorActionData,
  ReplayActionData,
  TypeCodeActionData,
} from '../../../../domain/Replay';
import { TextEditor } from '../../../Editor';
import { Scheduler } from '../../../Scheduler';
import { ThunkAction } from '../../../store/store';

export const playAction = (action: ReplayActionData): ThunkAction<Promise<void>> => {
  return async (_dispatch, _getState, { editors, scheduler }) => {
    const playFunc = { TypeCode, EraseCode, InsertLines, MoveCursor }[action.type];

    editors.textEditor.focus();
    // @ts-expect-error todo
    await playFunc(action, editors.textEditor, scheduler);
  };
};

const MoveCursor = async (action: MoveCursorActionData, editor: TextEditor, scheduler: Scheduler) => {
  if (editor.position[0] !== action.position[0] || editor.position[1] !== action.position[1]) {
    editor.position = action.position;
    await scheduler.wait('afterCursorMovement');
  }
};

const InsertLines = async (action: InsertLinesActionData, editor: TextEditor, scheduler: Scheduler) => {
  if (action.above > 0 || action.below > 0) {
    await editor.insertLinesAbove(action.above);
    await editor.insertLinesBelow(action.below);
    await scheduler.wait('afterCursorMovement');
  }
};

const TypeCode = async (action: TypeCodeActionData, editor: TextEditor, scheduler: Scheduler) => {
  if (scheduler.immediate) {
    editor.insert(action.code);
  } else {
    await editor.type(action.code);
  }
};

const EraseCode = async (action: EraseCodeActionData, editor: TextEditor) => {
  await editor.erase(action.end);
};
