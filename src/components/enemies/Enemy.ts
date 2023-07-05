import HPBar from '~/libs/HPBar';
import { IEnemy } from './interfaces';
import { ICharacter } from '~/components/characters/interfaces';
import { IHPBar } from '~/libs/interfaces';
import getBodyLists from '~/components/characters/BodyLists';
import { TBodyKey } from '~/components/characters/types';

export default class Enemy extends Phaser.Physics.Matter.Sprite implements IEnemy {
  private _nameTag: Phaser.GameObjects.Text;

  private _health: IHPBar;

  private _tween: Phaser.Tweens.Tween;

  get health(): IHPBar {
    return this._health;
  }

  readonly charactor: ICharacter;

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

    this._nameTag = scene.add.text(x, y, `enemy_${Math.floor(this.x)}`, {
      font: '12px Arial',
      color: '#2f4f4f',
    });

    this._health = new HPBar(scene, { x: -32, y: -32 });

    this._tween = this.scene.tweens.create({
      targets: this,
      scale: 2,
      repeat: -1,
      yoyo: true,
    });

    const charactor = getBodyLists(scene, x, y).get(key);
    this.charactor = charactor!();
    this.setExistingBody(this.charactor.body);

    this.startTween();
  }

  startTween() {
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

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this._nameTag.setPosition(this.x - 16, this.y - 16);
    this._health.setPosition(this.x, this.y);
  }
}
