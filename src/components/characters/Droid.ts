import Phaser from 'phaser';
import DroidImage from '@assets/droid/droid.png';
import DroidAtlas from '@assets/droid/droid_atlas.json';
import DroidAnim from '@assets/droid/droid_anim.json';
import { TAnim, TBodyKey } from './types';
import { ICharacter } from './interfaces';

export default class Droid implements ICharacter {
  private _animPrefix: TAnim;

  readonly bodyKey: TBodyKey = 'droid';

  readonly body: MatterJS.BodyType;

  get animKey(): string {
    return `${this.bodyKey}_${this.animPrefix}`;
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

  get isFlip(): boolean {
    return this._isFlip;
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('droid', DroidImage, DroidAtlas);
    scene.load.animation('droid', DroidAnim);
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const matter = new Phaser.Physics.Matter.MatterPhysics(scene);
    const body = matter.bodies.rectangle(x, y + 20, 32, 20, {
      ignoreGravity: true,
      restitution: 1,
      friction: 0,
      label: `${this.bodyKey}_body`,
    });
    const sensor = matter.bodies.circle(x, y, 32, {
      isSensor: true,
      label: `${this.bodyKey}_sensor`,
    });
    this.body = matter.body.create({
      parts: [body, sensor],
      label: this.bodyKey,
    });
    this._animPrefix = 'idle';
  }
}
