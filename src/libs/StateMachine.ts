interface IState {
  name: string;
  //   isFlip: boolean;
  onEnter?: () => void;
  onUpdate?: (dt: number) => void;
  onExit?: () => void;
}

export default class StateMachine {
  private states = new Map<string, IState>();

  private previousState?: IState;

  private currentState?: IState;

  private context?: object;

  private isChangingState = false;

  private changeStateQueue: string[] = [];

  constructor(context?: object) {
    this.context = context;
  }

  get previousStateName() {
    if (!this.previousState) return '';
    return this.previousState.name;
  }

  isCurrentState(name: string) {
    if (!this.currentState) return false;
    return this.currentState.name === name;
  }

  addState(
    name: string,
    config?: { onEnter?: () => void; onUpdate?: (dt: number) => void; onExit?: () => void }
  ) {
    const context = this.context;

    this.states.set(name, {
      name,
      onEnter: config?.onEnter?.bind(context),
      onUpdate: config?.onUpdate?.bind(context),
      onExit: config?.onExit?.bind(context),
    });

    return this;
  }

  setState(name: string) {
    if (!this.states.has(name)) {
      console.warn(`Tried to change to unknown state: ${name}`);
      return;
    }

    if (this.isCurrentState(name)) return;

    if (this.isChangingState) {
      this.changeStateQueue.push(name);
      return;
    }

    this.isChangingState = true;

    console.log(`StateMachine change from ${this.currentState?.name ?? 'none'} to ${name}`);

    if (this.currentState && this.currentState.onExit) {
      console.log(`StateMachine exited from ${this.currentState?.name}`);
      this.currentState.onExit();
    }

    this.previousState = this.currentState;
    this.currentState = this.states.get(name)!;

    if (this.currentState.onEnter) {
      console.log(`StateMachine entered to ${this.currentState?.name}`);
      this.currentState.onEnter();
    }

    this.isChangingState = false;
  }

  update(dt: number) {
    if (this.changeStateQueue.length > 0) {
      this.setState(this.changeStateQueue.shift()!);
      return;
    }

    if (this.currentState && this.currentState.onUpdate) this.currentState.onUpdate(dt);
  }
}
