import { EraseCodeAction } from './actions/EraseCodeAction';
import { InsertLinesAction } from './actions/InsertLinesAction';
import { MoveCursorAction } from './actions/MoveCursorAction';
import { TypeCodeAction } from './actions/TypeCodeAction';
import { MemoryEditor } from './MemoryEditor';

export type PositionData = [number, number];

export type MoveCursorActionData = {
  type: MoveCursorAction['type'];
  position: PositionData;
};

export type InsertLinesActionData = {
  type: InsertLinesAction['type'];
  above: number;
  below: number;
};

export type TypeCodeActionData = {
  type: TypeCodeAction['type'];
  code: string;
};

export type EraseCodeActionData = {
  type: EraseCodeAction['type'];
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

export interface ReplayAction {
  get data(): ReplayActionData;
  apply(editor: MemoryEditor): void;
}

export class ReplayStep {
  constructor(private name: string, private actions: ReplayAction[]) {}

  static create(step: ReplayStepData): ReplayStep {
    return new ReplayStep(step.name, step.actions.map(ReplayStep.createAction));
  }

  private static createAction(action: ReplayActionData): ReplayAction {
    switch (action.type) {
      case 'MoveCursor':
        return MoveCursorAction.create(action.position);

      case 'InsertLines':
        return InsertLinesAction.create(action);

      case 'TypeCode':
        return TypeCodeAction.create(action.code);

      case 'EraseCode':
        return EraseCodeAction.create(action.end);
    }
  }

  get data(): ReplayStepData {
    return {
      name: this.name,
      actions: this.actions.map((action) => action.data),
    };
  }

  apply(editor: MemoryEditor) {
    for (const action of this.actions) {
      action.apply(editor);
    }
  }
}

export class Replay {
  constructor(private steps: ReplayStep[]) {}

  static create(steps: ReplayStepData[]) {
    return new Replay(steps.map(ReplayStep.create));
  }

  play(): PlayedStepData[] {
    const editor = new MemoryEditor();
    const playedSteps: PlayedStepData[] = [];

    for (const step of this.steps) {
      const initialPosition = editor.position.values;
      const initialCode = editor.code;

      step.apply(editor);

      playedSteps.push({
        ...step.data,
        initialState: {
          code: initialCode,
          position: initialPosition,
        },
        finalState: {
          code: editor.code,
          position: editor.position.values,
        },
      });
    }

    return playedSteps;
  }
}
