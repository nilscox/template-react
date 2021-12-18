import { Action } from 'redux';

export class InvalidActionError extends Error {
  constructor(readonly action: Action) {
    super('Invalid action');
  }
}
