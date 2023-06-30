import DroidImage from '@assets/droid/droid.png';
import DroidAtlas from '@assets/droid/droid_atlas.json';
import DroidAnim from '@assets/droid/droid_anim.json';
import { TAnim } from './types';
import { IBody } from './interfaces';

export default class Droid extends Phaser.Physics.Matter.Sprite implements IBody {
  private _animPrefix: TAnim;

  readonly animKeyPrefix = 'droid';

  get animKey(): string {
    return `${this.animKeyPrefix}_${this.animPrefix}`;
  }

  set animPrefix(animPrefix: TAnim) {
    this._animPrefix = animPrefix;
  }

  get animPrefix(): TAnim {
    return this._animPrefix;
  }

  private _isFlip = false;

  set isFlip(isFlip: boolean) {
    this._isFlip = isFlip;
  }

  get isFlip() {
    return this._isFlip;
  }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: Phaser.Types.Physics.Matter.MatterBodyConfig
  ) {
    const defaults: Phaser.Types.Physics.Matter.MatterBodyConfig = {
      label: 'droid',
    };
    super(scene.matter.world, x, y, 'droid', '', Object.assign(defaults, config));

    const matter = new Phaser.Physics.Matter.MatterPhysics(scene);
    const body = matter.bodies.rectangle(x, y + 20, 32, 20, {
      ignoreGravity: true,
      restitution: 1,
      friction: 0,
      label: 'droid_body',
    });
    const sensor = matter.bodies.circle(x, y, 32, {
      isSensor: true,
      label: 'droid_sensor',
    });
    const boxBody = matter.body.create({
      parts: [body, sensor],
      label: 'droid',
    });
    this.setExistingBody(boxBody);
    this._animPrefix = 'idle';
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('droid', DroidImage, DroidAtlas);
    scene.load.animation('droid', DroidAnim);
  }

  update(): void {
    this.anims.play({ key: this.animKey }, true);
    this.setFlipX(this.isFlip);
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
  }
}
