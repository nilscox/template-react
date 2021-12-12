export class Scheduler {
  immediate = true;

  delays = {
    betweenActions: 1000,
    afterCursorMovement: 500,
    betweenCharacters: 15,
  };

  async wait(kind: keyof Scheduler['delays']) {
    if (this.immediate) {
      return;
    }

    await new Promise((r) => setTimeout(r, this.delays[kind]));
  }
}
