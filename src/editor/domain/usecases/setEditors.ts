import { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

import { ThunkAction } from '../../../store/store';
import { diffEditorReady } from '../editor.slice';

export const setDiffEditor = (monacoEditor: editor.IDiffEditor, monaco: Monaco): ThunkAction => {
  return (dispatch, _getState, { editors }) => {
    editors.setDiffEditor(monacoEditor, monaco);
    dispatch(diffEditorReady());
  };
};
