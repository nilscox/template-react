import { MemoryEditor } from './MemoryEditor';
import { ReplayActionData } from './Replay';

export interface ReplayAction {
  get data(): ReplayActionData;
  apply(editor: MemoryEditor): void;
}
