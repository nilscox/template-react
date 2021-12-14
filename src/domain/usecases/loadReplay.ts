import { setReplay } from '../slices/replay.slice';
import { ThunkAction } from '../store';
import { Replay, ReplayAction } from '../types/entities';

import { playAction } from './playActions';
import { setCurrentAction } from './setCurrentAction';

export type ReplayDto = Pick<Replay, 'currentActionIndex'> & {
  actions: Array<Pick<ReplayAction, 'type'>>;
};

export const loadReplay = (replayDto: ReplayDto): ThunkAction => {
  return async (dispatch, _getState, { editors, scheduler }) => {
    scheduler.immediate = true;

    const actions: ReplayAction[] = [];

    for (const actionDto of replayDto.actions) {
      const action: ReplayAction = {
        ...actionDto,
        id: Math.random().toString().slice(-6),
        codeBefore: editors.textEditor.value,
        codeAfter: '',
      };

      await dispatch(playAction(action));

      action.codeAfter = editors.textEditor.value;

      actions.push(action);
    }

    dispatch(
      setReplay({
        actions,
        currentActionIndex: replayDto.currentActionIndex,
      }),
    );

    dispatch(setCurrentAction(actions[0].id));
  };
};
