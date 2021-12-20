import { MemoryEditor } from './MemoryEditor';
import { ReplayActionData } from './types';

export interface ReplayAction {
  get data(): ReplayActionData;
  apply(editor: MemoryEditor): void;
}
