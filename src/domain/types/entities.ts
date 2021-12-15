export type Position = { line: number; column: number };
export type Range = { start: Position; end: Position };

export type TypeCodeAction = {
  type: 'TypeCode';
  position: Position;
  code: string;
  prepare: {
    insertLinesAbove: number;
    insertLinesBelow: number;
  };
};

export type EraseCodeAction = {
  type: 'EraseCode';
  start: Position;
  end: Position;
};

export type ReplayAction = TypeCodeAction | EraseCodeAction;

export type Replay = {
  actions: ReplayAction[];
};

export type DraftPosition = {
  line: string;
  column: string;
};

export type DraftTypeCodeAction = {
  type: 'TypeCode';
  position: DraftPosition;
  code: string;
  prepare: {
    insertLinesAbove: string;
    insertLinesBelow: string;
  };
};

export type DraftEraseCodeAction = {
  type: 'EraseCode';
  start: DraftPosition;
  end: DraftPosition;
};

export type DraftAction = DraftTypeCodeAction | DraftEraseCodeAction;
