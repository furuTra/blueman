import BoltImage from '@assets/bolt/bolt.png';
import BoltAtlas from '@assets/bolt/bolt_atlas.json';
import BoltAnim from '@assets/bolt/bolt_anim.json';
import { IBulletBody } from './interfaces';
import { TBulletKey } from './types';
import BaseBullet from './BaseBullet';

export default class Bolt extends BaseBullet implements IBulletBody {
  readonly bodyKey: TBulletKey = 'bolt';

  readonly bodyType: MatterJS.BodyType;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene);
    const sensor = this.bodies.circle(x, y, 16, {
      label: `${this.bodyKey}_sensor`,
      isSensor: true,
    });
    this.bodyType = this.body.create({
      parts: [sensor],
      label: this.bodyKey,
      friction: 0,
      frictionAir: 0,
    });
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.atlas('bolt', BoltImage, BoltAtlas);
    scene.load.animation('bolt', BoltAnim);
  }
}
