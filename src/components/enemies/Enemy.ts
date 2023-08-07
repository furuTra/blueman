import HPBar from '~/utils/HPBar';
import { IEnemy } from './interfaces';
import { ICharacter } from '~/components/characters/interfaces';
import { IHPBar } from '~/utils/interfaces';
import getCharacterLists from '~/components/characters/CharacterLists';
import { TBodyKey } from '~/components/characters/types';
import StateMachine from '~/utils/StateMachine';

export default class Enemy extends Phaser.Physics.Matter.Sprite implements IEnemy {
  private _nameTag: Phaser.GameObjects.Text;

  private _health: IHPBar;

  private _isFlip: boolean;

  private _tween?: Phaser.Tweens.Tween;

  get health(): IHPBar {
    return this._health;
  }

  readonly charactorKey: TBodyKey;

  readonly charactor: ICharacter;

  private _stateMachine: StateMachine;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: TBodyKey,
    config: Phaser.Types.Physics.Matter.MatterBodyConfig
  ) {
    const defaults: Phaser.Types.Physics.Matter.MatterBodyConfig = {
      label: 'enemy',
    };
    super(scene.matter.world, x, y, key, '', Object.assign(defaults, config));

    this.charactorKey = key;
    const charactor = getCharacterLists(scene, x, y, 'enemy').get(key);
    this.charactor = charactor!();

    this._nameTag = scene.add.text(x, y, `enemy_${Math.floor(this.x)}`, {
      font: '12px Arial',
      color: '#2f4f4f',
    });

    this._health = new HPBar(
      scene,
      { x: -32, y: -32 },
      this.charactor.hpValue,
      this.charactor.hpValue
    );
    this._isFlip = this.charactor.isFlip;

    this.setExistingBody(this.charactor.bodyType);
    this.setFlipX(this.charactor.isFlip);
    this._stateMachine = new StateMachine(this);
    this._stateMachine
      .addState('move', {
        onEnter: () => {
          this.charactor.animPrefix = 'move';
        },
        onUpdate: () => {
          if (this.body!.velocity.x === 0 && this.body!.velocity.y === 0) {
            this._stateMachine.setState('idle');
          }
          const isFlip = this._isFlip;
          if (this.body!.velocity.x > 0) {
            this.charactor.isFlip = !isFlip;
          } else if (this.body!.velocity.y < 0) {
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
          if (this.body!.velocity.x !== 0 || this.body!.velocity.y !== 0) {
            this._stateMachine.setState('move');
          }
        },
      })
      .setState('idle');
  }

  startTween() {
    this._tween = this.scene.tweens.create({
      targets: this,
      scale: 1.5,
      repeat: -1,
      yoyo: true,
    }) as Phaser.Tweens.Tween;
    this._tween.makeActive();
  }

  removeName() {
    this._nameTag.setActive(false).setVisible(false);
  }

  showName() {
    this._nameTag
      .setText(`enemy${Math.floor(this.x)}`)
      .setActive(true)
      .setVisible(true);
  }

  despawn() {
    this.removeName();
    this.health.removeHealthBar();
    this.setActive(false).setVisible(false).removeInteractive();
  }

  homing(targetX: number, targetY: number) {
    const targetAngle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY);
    const vx = Math.cos(targetAngle) * this.charactor.speed;
    const vy = Math.sin(targetAngle) * this.charactor.speed;
    this.setVelocity(vx, vy);
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this._stateMachine.update(delta);
    this.setFlipX(this.charactor.isFlip);
    this._nameTag.setPosition(this.x - 16, this.y - 16);
    this._health.setPosition(this.x, this.y);
  }
}
