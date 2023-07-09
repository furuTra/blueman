import Phaser from 'phaser';
import BlueImage from '@assets/blue/blue.png';
import BlueAtlas from '@assets/blue/blue_atlas.json';
import BlueAnim from '@assets/blue/blue_anim.json';
import { ICharacter } from './interfaces';
import { TAnim, TBodyKey } from './types';
import BaseCharacter from './BaseCharacter';

export default class Blue extends BaseCharacter implements ICharacter {
  private _animPrefix: TAnim;

  readonly bodyKey: TBodyKey = 'blue';

  readonly bodyType: MatterJS.BodyType;

  readonly hpValue = 60;

  readonly speed = 1.5;

  get animKey(): string {
    return `${this.bodyKey}_${this.animPrefix}`;
  }

  set animPrefix(animPrefix: TAnim) {
    this._animPrefix = animPrefix;
  }

  get animPrefix(): TAnim {
    return this._animPrefix;
  }

  private _isFlip = true;

  set isFlip(isFlip: boolean) {
    this._isFlip = isFlip;
  }

  get isFlip() {
    return this._isFlip;
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('blue', BlueImage, BlueAtlas);
    scene.load.animation('blue', BlueAnim);
  }

  constructor(scene: Phaser.Scene, x: number, y: number, label: string = 'enemy') {
    super(scene);
    const body = this.bodies.rectangle(x, y + 20, 32, 32, {
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
    });
    this._animPrefix = 'idle';
  }
}
