import { editor } from 'monaco-editor';

import { ChunkAddition } from '../Chunk';
import { CursorPosition } from '../Replay';
import { ReplayAction } from '../ReplayAction';

export class TypeCode extends ReplayAction {
  type = 'TypeCode';

  private constructor(readonly chunk: ChunkAddition) {
    super();
  }

  static create(position: CursorPosition, code: string) {
    return new TypeCode(ChunkAddition.create(position, code));
  }

  static from(object: any) {
    return new TypeCode(ChunkAddition.from(object.chunk));
  }

  override get initialCursorPosition(): CursorPosition | undefined {
    return this.chunk.initialCursorPosition;
  }

  override get finalCursorPosition(): CursorPosition | undefined {
    return this.chunk.finalCursorPosition;
  }

  apply = this.chunk.apply.bind(this.chunk);

  async playForward(editor: editor.IEditor) {
    const { line, column, code } = this.chunk;

    editor.setPosition({ lineNumber: line, column });
    await this.wait(300);

    for (const char of code) {
      editor.trigger('keyboard', 'type', { text: char });
      await this.wait(10);
    }
  }
}
