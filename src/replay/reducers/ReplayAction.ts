import { ReplayAction as ReplayActionProps } from '../replay.slice';

import { MemoryEditor } from './MemoryEditor';

export enum ActionType {
  TypeCode = 'TypeCode',
}

export interface ReplayAction {
  readonly props: ReplayActionProps;
  apply(editor: MemoryEditor): void;
}
