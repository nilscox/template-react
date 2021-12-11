import { AddSelections } from './actions/AddSelections';
import { DeleteSelection } from './actions/DeleteSelection';
import { EraseCode } from './actions/EraseCode';
import { InsertLines } from './actions/InsertLines';
import { SetCursorPosition } from './actions/SetCursorPosition';
import { TypeCode } from './actions/TypeCode';
import { Replay } from './Replay';
import { ReplayAction } from './ReplayAction';

export class ReplayBuilder {
  private replay = new Replay();

  private creator<Action extends ReplayAction, Params extends unknown[]>(actionClass: {
    new (...params: Params): Action;
  }) {
    return (...params: Params) => {
      this.replay.addAction(new actionClass(...params));
    };
  }

  get() {
    return this.replay;
  }

  // cursor movement
  setCursorPosition = this.creator(SetCursorPosition);

  // selection
  addSelections = this.creator(AddSelections);
  deleteSelection = this.creator(DeleteSelection);

  // text edition
  typeCode = this.creator(TypeCode);
  eraseCode = this.creator(EraseCode);
  insertLines = this.creator(InsertLines);
}
