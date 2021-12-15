import { EraseCodeAction } from './EraseCode';
import { TypeCodeAction } from './TypeCode';

export type ReplayAction = TypeCodeAction | EraseCodeAction;

export class Replay {
  constructor(readonly actions: ReplayAction[]) {}
}
