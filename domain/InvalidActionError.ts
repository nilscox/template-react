import { ReplayAction } from './Replay';

export class InvalidActionError extends Error {
  constructor(readonly action: ReplayAction) {
    super('Invalid action');
  }
}
