import { MemoryEditor } from './MemoryEditor';
import { ReplayStep } from './ReplayStep';
import { EditorState, PlayedCommitData } from './types';

export class ReplayCommit {
  public steps: ReplayStep[];

  constructor(public props: PlayedCommitData, private prevCommit: ReplayCommit | null) {
    this.steps = props.steps.map(ReplayStep.create);
  }

  static create(props: PlayedCommitData, prevCommit: ReplayCommit | null = null): ReplayCommit {
    return new ReplayCommit(props, prevCommit);
  }

  get data(): PlayedCommitData {
    return this.props;
  }

  get finalState(): EditorState {
    const defaultState: EditorState = {
      code: '',
      position: [1, 1],
    };

    if (this.steps.length === 0) {
      return this.prevCommit?.finalState ?? defaultState;
    }

    return this.steps[this.steps.length - 1].finalState;
  }

  setName(name: string) {
    this.props.name = name;
  }

  addStep() {
    this.props.steps.push({
      name: '',
      actions: [],
      initialState: this.finalState,
      finalState: this.finalState,
    });
  }

  apply(editor: MemoryEditor) {
    for (const step of this.steps) {
      step.apply(editor);
    }
  }
}
