import { EditorState } from '../../../domain/types';

import { CursorPosition } from './CursorPosition';

export class MemoryEditor {
  public code = '';
  public position = new CursorPosition(1, 1);

  constructor(state?: EditorState) {
    if (state) {
      this.code = state.code;
      this.position.set(...state.position);
    }
  }
}
