import { State } from './store';

export const selectIsEditorReady = (state: State) => {
  return state.editor.ready;
};
