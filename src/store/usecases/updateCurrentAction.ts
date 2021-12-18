import { PlayedActionData } from '../../../domain/Replay';
import { selectReplay } from '../slices/replay.selectors';
import { updateActions } from '../slices/replay.slice';
import { ThunkAction } from '../store';

export const updateCurrentAction = (action: PlayedActionData): ThunkAction => {
  return (dispatch, getState) => {
    const replay = selectReplay(getState());
    const actions = replay.actions.slice(replay.currentActionIndex + 1);

    const executor = new ReplayExecutor([action, ...actions.map(instantiateAction)]);
    const playedActions = executor.applyAllActions();

    dispatch(updateActions(newActions.map((action) => action.toJSON())));
  };
};
