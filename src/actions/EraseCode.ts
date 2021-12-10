import { editor } from 'monaco-editor';

import { ChunkRemoval } from '../Chunk';
import { CursorPosition } from '../Replay';
import { ReplayAction } from '../ReplayAction';

export class EraseCode extends ReplayAction {
  private constructor(readonly chunk: ChunkRemoval) {
    super();
  }

  static create(start: number | CursorPosition, end: number | CursorPosition) {
    return new EraseCode(ChunkRemoval.create(start, end));
  }

  override get initialCursorPosition(): CursorPosition | undefined {
    return this.chunk.initialCursorPosition;
  }

  override get finalCursorPosition(): CursorPosition | undefined {
    return this.chunk.finalCursorPosition;
  }

  apply = this.chunk.apply.bind(this.chunk);

  async playForward(editor: editor.IEditor) {
    const [startLine, startColumn] = this.chunk.initialCursorPosition;
    const [endLine, endColumn] = this.chunk.finalCursorPosition;

    editor.setPosition({ lineNumber: startLine, column: startColumn });
    await this.wait(500);

    const isFinalPosition = () => {
      const { lineNumber: currentLine, column: currentColumn } = editor.getPosition() ?? {};

      return currentLine === endLine && currentColumn === endColumn;
    };

    while (!isFinalPosition()) {
      editor.trigger('keyboard', 'deleteLeft', {});
      await new Promise((r) => setTimeout(r, 12));
    }
  }
}
