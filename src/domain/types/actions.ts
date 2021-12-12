import { Position } from '../../Position';

// cursor movement

type SetCursorPositionAction = {
  type: 'SetCursorPosition';
  id: string;
  position: Position;
};

export default SetCursorPositionAction;

export type CursorMovementAction = SetCursorPositionAction;

// selections

export type AddSelectionsAction = {
  type: 'AddSelections';
  id: string;
  ranges: Array<[Position, Position]>;
};

export type DeleteSelectionAction = {
  type: 'DeleteSelection';
  id: string;
};

export type SelectionAction = AddSelectionsAction | DeleteSelectionAction;

// text edition

export type TypeCodeAction = {
  type: 'TypeCode';
  id: string;
  position: Position;
  code: string;
  prepare: {
    insertLinesAbove: number;
    insertLinesBelow: number;
  };
};

export type EraseCodeAction = {
  type: 'EraseCode';
  id: string;
  start: Position;
  end: Position;
};

export type InsertLinesAction = {
  type: 'InsertLines';
  id: string;
  position: Position;
  insertLinesAbove: number;
  insertLinesBelow: number;
};

export type TextEditionAction = TypeCodeAction | EraseCodeAction | InsertLinesAction;

export type ReplayAction = CursorMovementAction | SelectionAction | TextEditionAction;
