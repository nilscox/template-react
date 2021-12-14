import { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

import { diffEditorReady, editorReady } from '../slices/editor.slice';
import { ThunkAction } from '../store';

export const setEditor = (monacoEditor: editor.ICodeEditor): ThunkAction => {
  return (dispatch, _getState, { editors }) => {
    editors.setTextEditor(monacoEditor);
    dispatch(editorReady());
  };
};

export const setDiffEditor = (monacoEditor: editor.IDiffEditor, monaco: Monaco): ThunkAction => {
  return (dispatch, _getState, { editors }) => {
    editors.setDiffEditor(monacoEditor, monaco);
    dispatch(diffEditorReady());
  };
};
