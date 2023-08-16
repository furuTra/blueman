import Phaser from 'phaser';
import GreenImage from '@assets/green/green.png';
import GreenAtlas from '@assets/green/green_atlas.json';
import GreenAnim from '@assets/green/green_warrior_anim.json';
import { ICharacter } from '../interfaces';
import { TAnim, TBodyKey } from '../types';
import BaseCharacter from '../BaseCharacter';

export default class GreenWarrior extends BaseCharacter implements ICharacter {
  private _animPrefix: TAnim = 'idle';

  readonly bodyKey: TBodyKey = 'green_warrior';

  readonly bodyType: MatterJS.BodyType;

  readonly hpValue = 120;

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

  private _isFlip = true;

  set isFlip(isFlip: boolean) {
    this._isFlip = isFlip;
  }

  get isFlip() {
    return this._isFlip;
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('green', GreenImage, GreenAtlas);
    scene.load.animation('green_warrior', GreenAnim);
  }

  constructor(scene: Phaser.Scene, x: number, y: number, label: string = 'enemy') {
    super(scene);
    const body = this.bodies.rectangle(x, y + 20, 40, 40, {
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
  }
}
