import Phaser from 'phaser';
import DroidImage from '@assets/droid/droid.png';
import DroidAtlas from '@assets/droid/droid_atlas.json';
import DroidAnim from '@assets/droid/droid_anim.json';
import { TAnim, TBodyKey } from './types';
import { ICharacter } from './interfaces';
import BaseCharacter from './BaseCharacter';

export default class Droid extends BaseCharacter implements ICharacter {
  private _animPrefix: TAnim;

  readonly bodyKey: TBodyKey = 'droid';

  readonly bodyType: MatterJS.BodyType;

  readonly hpValue = 200;

  readonly speed = 0.5;

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

  constructor(scene: Phaser.Scene, x: number, y: number, label: string = 'enemy') {
    super(scene);
    this._animPrefix = 'idle';
    const body = this.bodies.rectangle(x, y + 20, 32, 20, {
      ignoreGravity: true,
      restitution: 1,
      friction: 0,
      label: `${label}_body`,
    });
    const sensor = this.bodies.circle(x, y, 32, {
      isSensor: true,
      label: `${label}_sensor`,
    });
    this.bodyType = this.body.create({
      parts: [body, sensor],
      label: this.bodyKey,
    });
  }
}
