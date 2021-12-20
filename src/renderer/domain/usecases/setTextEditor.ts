import { editor } from 'monaco-editor';

import { ThunkAction } from '../../../store/store';
import { textEditorReady } from '../renderer.slice';

export const setTextEditor = (monacoEditor: editor.ICodeEditor): ThunkAction => {
  return (dispatch, _getState, { editors }) => {
    editors.setTextEditor(monacoEditor);
    dispatch(textEditorReady());
  };
};
