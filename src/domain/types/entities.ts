export type Position = { line: number; column: number };
export type Range = { start: Position; end: Position };

export type BaseAction = {
  id: string;
  codeBefore: string;
  codeAfter: string;
};

export type TypeCodeAction = BaseAction & {
  type: 'TypeCode';
  position: Position;
  code: string;
  prepare: {
    insertLinesAbove: number;
    insertLinesBelow: number;
  };
};

export type EraseCodeAction = BaseAction & {
  type: 'EraseCode';
  start: Position;
  end: Position;
};

export type ReplayAction = TypeCodeAction | EraseCodeAction;

export type Replay = {
  actions: ReplayAction[];
  currentActionIndex: number;
};

export type DraftPosition = {
  line: string;
  column: string;
};

export type DraftTypeCodeAction = {
  position: DraftPosition;
  code: string;
  prepare: {
    insertLinesAbove: string;
    insertLinesBelow: string;
  };
};

export type DraftEraseCodeAction = {
  start: DraftPosition;
  end: DraftPosition;
};

export type DraftAction = DraftTypeCodeAction | DraftEraseCodeAction;
