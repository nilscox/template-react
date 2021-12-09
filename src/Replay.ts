import { Chunk } from './Chunk';

export type CursorPosition = [number, number];

export class Replay {
  private currentChunkIndex: number;

  private constructor(readonly chunks: Chunk[] = []) {
    this.currentChunkIndex = chunks.length;
  }

  static create(chunks?: Chunk[]) {
    return new Replay(chunks ?? []);
  }

  private get lastChunk(): Chunk {
    return this.chunks[this.chunks.length - 1];
  }

  get currentChunk(): Chunk {
    return this.chunks[this.currentChunkIndex];
  }

  get cursorPosition(): CursorPosition {
    if (!this.currentChunk) {
      return this.lastChunk.finalCursorPosition;
    }

    return this.currentChunk.initialCursorPosition;
  }

  get nextCursorPosition(): CursorPosition {
    if (!this.currentChunk) {
      throw new Error('Replay.nextCursorPosition: no current chunk');
    }

    return this.currentChunk.finalCursorPosition;
  }

  get progress() {
    return this.currentChunkIndex / this.chunks.length;
  }

  addChunk(chunk: Chunk) {
    this.chunks.push(chunk);
    this.currentChunkIndex++;
  }

  reset() {
    this.currentChunkIndex = 0;
  }

  nextChunk() {
    if (this.currentChunkIndex === this.chunks.length) {
      throw new Error('Replay.nextChunk: already on the last chunk');
    }

    this.currentChunkIndex++;
  }

  get code() {
    // prettier-ignore
    return this.chunks
      .slice(0, this.currentChunkIndex)
      .reduce((code, chunk) => chunk.apply(code), '');
  }
}
