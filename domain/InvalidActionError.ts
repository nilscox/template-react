import { ReplayAction } from './ReplayAction';

export class InvalidActionError extends Error {
  constructor(readonly action: ReplayAction) {
    super('Invalid action');
  }
}
