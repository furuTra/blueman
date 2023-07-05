import BoltImage from '@assets/bolt/bolt.png';
import BoltAtlas from '@assets/bolt/bolt_atlas.json';
import BoltAnim from '@assets/bolt/bolt_anim.json';
import { IBulletBody } from './interfaces';
import { TBulletKey } from './types';

export default class Bolt implements IBulletBody {
  readonly bodyKey: TBulletKey = 'bolt';

  readonly body: MatterJS.BodyType;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const matter = new Phaser.Physics.Matter.MatterPhysics(scene);
    const sensor = matter.bodies.circle(x, y, 16, {
      label: `${this.bodyKey}_sensor`,
      isSensor: true,
    });
    this.body = matter.body.create({
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
