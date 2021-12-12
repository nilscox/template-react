import { Editor } from '../Editor';
import { Range } from '../Range';

import { ReplayAction } from './replay.slice';
import { Scheduler } from './Scheduler';
import { selectIsEditorReady, ThunkAction } from './store';

export const playActions = (actions: ReplayAction[]): ThunkAction<Promise<void>> => {
  return async (dispatch, getState, { editor, scheduler }) => {
    const editorReady = selectIsEditorReady(getState());

    if (!editorReady) {
      throw new Error('replay/playTo: editor is not ready');
    }

    for (const action of actions) {
      await playAction(action, editor, scheduler);
      await scheduler.wait('betweenActions');
    }
  };
};

const playAction = async (action: ReplayAction, editor: Editor, scheduler: Scheduler) => {
  editor.focus();

  switch (action.type) {
    case 'TypeCode':
      editor.position = action.position;
      await scheduler.wait('afterCursorMovement');

      await editor.insertLinesAbove(action.prepare.insertLinesAbove);
      await editor.insertLinesBelow(action.prepare.insertLinesBelow);

      if (scheduler.immediate) {
        editor.insert(action.code);
      } else {
        await editor.type(action.code);
      }

      break;

    case 'EraseCode':
      editor.position = action.end;
      await scheduler.wait('afterCursorMovement');

      await editor.erase(action.start);

      break;

    case 'InsertLines':
      editor.position = action.position;
      await scheduler.wait('afterCursorMovement');

      await editor.insertLinesAbove(action.insertLinesAbove);
      await editor.insertLinesBelow(action.insertLinesBelow);

      break;

    case 'SetCursorPosition':
      editor.position = action.position;
      break;

    case 'AddSelections':
      editor.selections = action.ranges.map(([start, end]) => new Range(start, end));
      break;

    case 'DeleteSelection':
      editor.backspace();
      editor.clearMultiCursor();
      break;
  }
};
