import { EraseCodeAction } from './actions/EraseCodeAction';
import { TypeCodeAction } from './actions/TypeCodeAction';
import { MemoryEditor } from './MemoryEditor';

export type PositionData = [number, number];

export type TypeCodeActionData = {
  type: TypeCodeAction['type'];
  position: PositionData;
  code: string;
  prepare: {
    insertLinesAbove: number;
    insertLinesBelow: number;
  };
};

export type EraseCodeActionData = {
  type: EraseCodeAction['type'];
  start: PositionData;
  end: PositionData;
};

export type ReplayActionData = TypeCodeActionData | EraseCodeActionData;

export type ReplayStepData = {
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
  constructor(private actions: ReplayAction[]) {}

  static create(step: ReplayStepData): ReplayStep {
    return new ReplayStep(step.actions.map(ReplayStep.createAction));
  }

  private static createAction(action: ReplayActionData): ReplayAction {
    switch (action.type) {
      case 'TypeCode':
        return TypeCodeAction.create(action.position, action.code, action.prepare);

      case 'EraseCode':
        return EraseCodeAction.create(action.start, action.end);
    }
  }

  get data(): ReplayStepData {
    return {
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
      const initialPosition = editor.position.clone();
      const initialCode = editor.code;

      step.apply(editor);

      playedSteps.push({
        ...step.data,
        initialState: {
          code: initialCode,
          position: initialPosition.values,
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
