import { EraseCodeAction } from './actions/EraseCodeAction';
import { TypeCodeAction } from './actions/TypeCodeAction';
import { MemoryEditor } from './MemoryEditor';
import { ReplayAction } from './ReplayAction';

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

export type PlayedActionData = ReplayActionData & {
  initialPosition: PositionData;
  initialCode: string;
  finalPosition: PositionData;
  finalCode: string;
};

export class Replay {
  constructor(private actions: ReplayAction[]) {}

  static create(actions: ReplayActionData[]) {
    return new Replay(
      actions.map((action) => {
        switch (action.type) {
          case 'TypeCode':
            return TypeCodeAction.create(action.position, action.code, action.prepare);

          case 'EraseCode':
            return EraseCodeAction.create(action.start, action.end);
        }
      }),
    );
  }

  play(): PlayedActionData[] {
    const editor = new MemoryEditor();
    const playedActions: PlayedActionData[] = [];

    for (const action of this.actions) {
      const initialPosition = editor.position.clone();
      const initialCode = editor.code;

      action.apply(editor);

      playedActions.push({
        ...action.data,
        initialPosition: initialPosition.values,
        initialCode,
        finalPosition: editor.position.values,
        finalCode: editor.code,
      });
    }

    return playedActions;
  }
}
