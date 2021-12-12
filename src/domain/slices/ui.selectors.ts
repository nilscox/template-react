import { State } from '../store';

export const selectPropertiesEditionVisible = (state: State) => {
  return state.ui.propertiesEditionVisible;
};
