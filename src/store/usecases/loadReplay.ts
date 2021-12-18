import { Replay, ReplayActionData } from '../../../domain/Replay';
import { setReplay } from '../slices/replay.slice';
import { ThunkAction } from '../store';

import { setCurrentAction } from './setCurrentAction';

export const loadReplay = (actions: ReplayActionData[]): ThunkAction => {
  return (dispatch) => {
    const playedActions = Replay.create(actions).play();

    dispatch(
      setReplay({
        actions: playedActions,
        currentActionIndex: 0,
      }),
    );

    dispatch(setCurrentAction(playedActions[0]));
  };
};
