import Phaser from 'phaser';
import StateMachine from '~/libs/StateMachine';
import WASD from '~/libs/WASD';
import { IWASD } from '~/libs/interfaces';
import { IPlayer } from './interfaces';
import { ICharacter } from './characters/interfaces';
import { TBodyKey } from './characters/types';
import getCharacterLists from './characters/CharacterLists';

export default class Player extends Phaser.Physics.Matter.Sprite implements IPlayer {
  private cursor: Phaser.Types.Input.Keyboard.CursorKeys;

  private _speed: number;

  private wasd: IWASD;

  private _isFlip: boolean;

  private _isMouseDown = false;

  private stateMachine: StateMachine;

  get isMouseDown(): boolean {
    return this._isMouseDown;
  }

  readonly charactor: ICharacter;

  public mouse = { x: 0, y: 0 };

  private velocityX(): number {
    let x = 0;
    if (this._isMouseDown) {
      return x;
    }
    x += this.cursor?.left.isDown ? -this._speed : 0;
    x += this.cursor?.right.isDown ? this._speed : 0;
    x += this.wasd.velocityX(this._speed);
    return x;
  }

  private velocityY(): number {
    let y = 0;
    if (this._isMouseDown) {
      return y;
    }
    y += this.cursor?.up.isDown ? -this._speed : 0;
    y += this.cursor?.down.isDown ? this._speed : 0;
    y += this.wasd.velocityY(this._speed);
    return y;
  }

  constructor(
    scene: Phaser.Scene,
    key: TBodyKey,
    x: number,
    y: number,
    config?: Phaser.Types.Physics.Matter.MatterBodyConfig
  ) {
    const defaults: Phaser.Types.Physics.Matter.MatterBodyConfig = {
      label: 'player',
    };
    super(scene.matter.world, x, y, key, '', Object.assign(defaults, config));
    const charactor = getCharacterLists(scene, x, y, 'player').get(key);
    this.charactor = charactor!();
    this.setExistingBody(this.charactor.bodyType);

    this._speed = 3;
    this._isFlip = this.charactor.isFlip;

    this.cursor = this.scene.input.keyboard.createCursorKeys();
    this.wasd = new WASD(this.scene);

    this.stateMachine = new StateMachine(this);
    this.stateMachine
      .addState('move', {
        onEnter: () => {
          this.charactor.animPrefix = 'move';
        },
        onUpdate: () => {
          if (this.velocityX() === 0 && this.velocityY() === 0) this.stateMachine.setState('idle');
          this.setVelocity(this.velocityX(), this.velocityY());
          const isFlip = this._isFlip;
          if (this.velocityX() > 0) {
            this.charactor.isFlip = !isFlip;
          } else if (this.velocityX() < 0) {
            this.charactor.isFlip = isFlip;
          }
        },
        onExit: () => {
          this.charactor.animPrefix = 'idle';
        },
      })
      .addState('idle', {
        onEnter: () => {
          this.charactor.animPrefix = 'idle';
        },
        onUpdate: () => {
          if (this.velocityX() !== 0 || this.velocityY() !== 0) this.stateMachine.setState('move');
          if (this._isMouseDown) this.stateMachine.setState('attack');
        },
      })
      .addState('attack', {
        onEnter: () => {
          this.charactor.animPrefix = 'attack';
        },
        onUpdate: () => {
          if (!this._isMouseDown) this.stateMachine.setState('idle');
        },
        onExit: () => {
          this.charactor.animPrefix = 'idle';
        },
      })
      .setState('idle');
  }

  create(): void {
    this.scene.add.existing(this);
    this.anims.play(this.charactor.animKey);
    this.setFixedRotation();
    this.mouseDown();
  }

  update(dt: number): void {
    this.stateMachine.update(dt);
    this.anims.play({ key: this.charactor.animKey }, true);
    this.setFlipX(this.charactor.isFlip);
  }

  private mouseDown(): void {
    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this._isMouseDown = true;
      this.mouse = { x: pointer.x, y: pointer.y };
    });

    this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.mouse = { x: pointer.x, y: pointer.y };
    });

    this.scene.input.on('pointerup', (_pointer: Phaser.Input.Pointer) => {
      this._isMouseDown = false;
    });
  }
}
