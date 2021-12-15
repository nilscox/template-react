import { ReplayActionState, setReplay } from '../slices/replay.slice';
import { ThunkAction } from '../store';
import { Replay } from '../types/entities';

import { playAction } from './playActions';
import { setCurrentAction } from './setCurrentAction';

export const loadReplay = (replay: Replay): ThunkAction => {
  return async (dispatch) => {
    const actions: ReplayActionState[] = [];

    for (const action of replay.actions) {
      const codeBefore = '';

      await dispatch(playAction(action));

      actions.push({
        id: createId(),
        codeBefore,
        codeAfter: '',
        ...action,
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
