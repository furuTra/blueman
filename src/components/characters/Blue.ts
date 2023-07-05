import Phaser from 'phaser';
import BlueImage from '@assets/blue/blue.png';
import BlueAtlas from '@assets/blue/blue_atlas.json';
import BlueAnim from '@assets/blue/blue_anim.json';
import { ICharacter } from './interfaces';
import { TAnim, TBodyKey } from './types';

export default class Blue implements ICharacter {
  private _animPrefix: TAnim;

  readonly bodyKey: TBodyKey = 'blue';

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

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const matter = new Phaser.Physics.Matter.MatterPhysics(scene);
    const body = matter.bodies.rectangle(x, y + 20, 32, 32, {
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
    });
    this._animPrefix = 'idle';
  }
}
