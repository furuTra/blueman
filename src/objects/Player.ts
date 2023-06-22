import Phaser from 'phaser';
import StateMachine from '../libs/StateMachine';

export default class Player implements IPlayer {
  private cursor: Phaser.Types.Input.Keyboard.CursorKeys;

  private _speed: number;

  private wasd: IWASD;

  private _isFlip: boolean;

  private _isMouseDown = false;

  private stateMachine: StateMachine;

  get isMouseDown(): boolean {
    return this._isMouseDown;
  }

  public body: IBody;

  public mouse: TPos;

  private velocityX(): number {
    let x = 0;
    if (this._isMouseDown) {
      return x;
    }
    x += this.cursor?.left.isDown ? -this._speed : 0;
    x += this.cursor?.right.isDown ? this._speed : 0;
    x += this.wasd?.A.isDown ? -this._speed : 0;
    x += this.wasd?.D.isDown ? this._speed : 0;
    return x;
  }

  private velocityY(): number {
    let y = 0;
    if (this._isMouseDown) {
      return y;
    }
    y += this.cursor?.up.isDown ? -this._speed : 0;
    y += this.cursor?.down.isDown ? this._speed : 0;
    y += this.wasd?.W.isDown ? -this._speed : 0;
    y += this.wasd?.S.isDown ? this._speed : 0;
    return y;
  }

  constructor(body: IBody) {
    this.body = body;
    this._speed = 3;
    this._isFlip = this.body.isFlip;
    this.mouse = { x: 0, y: 0 };
    this.cursor = this.body.scene.input.keyboard.createCursorKeys();
    this.wasd = {
      W: this.body.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.body.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.body.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.body.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    this.stateMachine = new StateMachine(this, 'player');
    this.stateMachine
      .addState('move', {
        onEnter: () => {
          this.body.animPrefix = 'move';
        },
        onUpdate: () => {
          if (this.velocityX() === 0 && this.velocityY() === 0) this.stateMachine.setState('idle');
          this.body.setVelocity(this.velocityX(), this.velocityY());
          const isFlip = this._isFlip;
          if (this.velocityX() > 0) {
            this.body.isFlip = !isFlip;
          } else if (this.velocityX() < 0) {
            this.body.isFlip = isFlip;
          }
          this.body.update();
        },
        onExit: () => {
          this.body.animPrefix = 'idle';
        },
      })
      .addState('idle', {
        onEnter: () => {
          this.body.animPrefix = 'idle';
        },
        onUpdate: () => {
          if (this.velocityX() !== 0 || this.velocityY() !== 0) this.stateMachine.setState('move');
          if (this._isMouseDown) this.stateMachine.setState('attack');
          this.body.update();
        },
      })
      .addState('attack', {
        onEnter: () => {
          this.body.animPrefix = 'attack';
        },
        onUpdate: () => {
          if (!this._isMouseDown) this.stateMachine.setState('idle');
        },
        onExit: () => {
          this.body.animPrefix = 'idle';
        },
      })
      .setState('idle');
  }

  create(): void {
    this.body.setData({ speed: this._speed, isFlip: false, attackCount: 0, hp: 100 });
    this.body.scene.add.existing(this.body);
    this.body.anims.play(this.body.animKey);
    this.body.setFixedRotation();
    this.mouseDown();
  }

  update(dt: number): void {
    this.stateMachine.update(dt);
  }

  private mouseDown(): void {
    this.body.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this._isMouseDown = true;
      this.mouse = { x: pointer.x, y: pointer.y };
    });

    this.body.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.mouse = { x: pointer.x, y: pointer.y };
    });

    this.body.scene.input.on('pointerup', (_pointer: Phaser.Input.Pointer) => {
      this._isMouseDown = false;
    });
  }
}
