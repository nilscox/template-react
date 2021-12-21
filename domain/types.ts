export enum ActionType {
  MoveCursor = 'MoveCursor',
  InsertLines = 'InsertLines',
  TypeCode = 'TypeCode',
  EraseCode = 'EraseCode',
}

export type PositionData = [number, number];

export type MoveCursorActionData = {
  type: ActionType.MoveCursor;
  position: PositionData;
};

export type InsertLinesActionData = {
  type: ActionType.InsertLines;
  above: number;
  below: number;
};

export type TypeCodeActionData = {
  type: ActionType.TypeCode;
  code: string;
};

export type EraseCodeActionData = {
  type: ActionType.EraseCode;
  end: PositionData;
};

export type ReplayActionData = TypeCodeActionData | EraseCodeActionData | MoveCursorActionData | InsertLinesActionData;

export type ReplayStepData = {
  name: string;
  actions: ReplayActionData[];
};

export type EditorState = {
  code: string;
  position: PositionData;
};

export type PlayedStepData = ReplayStepData & {
  initialState: EditorState;
  finalState: EditorState;
};

export type ReplayCommitData = {
  name: string;
  steps: ReplayStepData[];
};

export type PlayedCommitData = {
  name: string;
  steps: PlayedStepData[];
};
