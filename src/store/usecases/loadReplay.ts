import { CursorPosition } from '../../domain/CursorPosition';
import { EraseCodeAction } from '../../domain/EraseCode';
import { TypeCodeAction } from '../../domain/TypeCode';
import { ReplayActionState, setReplay } from '../slices/replay.slice';
import { ThunkAction } from '../store';
import { Replay, ReplayAction } from '../types/entities';

import { setCurrentAction } from './setCurrentAction';

export const loadReplay = (replay: Replay): ThunkAction => {
  return (dispatch) => {
    const actions: ReplayActionState[] = [];
    let code = '';

    for (const actionData of replay.actions) {
      const codeBefore = code;
      const action = instantiateAction(actionData);

      code = action.apply(code);

      actions.push({
        id: createId(),
        codeBefore,
        codeAfter: code,
        ...action.toJSON(),
      });
    }

    dispatch(
      setReplay({
        actions,
        currentActionIndex: 0,
      }),
    );

    dispatch(setCurrentAction(actions[0].id));
  };
};

const createId = () => {
  return Math.random().toString().slice(-6);
};

export const instantiateAction = (data: ReplayAction) => {
  if (data.type === 'TypeCode') {
    const action = new TypeCodeAction(new CursorPosition(data.position.line, data.position.column), data.code);

    if (data.prepare.insertLinesAbove) {
      action.prepare.insertLinesAbove = data.prepare.insertLinesAbove;
    }

    if (data.prepare.insertLinesBelow) {
      action.prepare.insertLinesBelow = data.prepare.insertLinesBelow;
    }

    return action;
  }

  return new EraseCodeAction(
    new CursorPosition(data.start.line, data.start.column),
    new CursorPosition(data.end.line, data.end.column),
  );
};
