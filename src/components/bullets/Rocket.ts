import Phaser from 'phaser';
import RocketImage from '@assets/rocket/rocket.png';
import RocketAtlas from '@assets/rocket/rocket_atlas.json';
import RocketAnim from '@assets/rocket/rocket_anim.json';
import { IBulletBody } from './interfaces';
import { TBulletKey } from './types';
import BaseBullet from './BaseBullet';

export default class Rocket extends BaseBullet implements IBulletBody {
  readonly bodyKey: TBulletKey = 'rocket';

  readonly bodyType: MatterJS.BodyType;

  constructor(scene: Phaser.Scene, x: number, y: number, label: string = 'bullet') {
    super(scene);
    const sensor = this.bodies.rectangle(x, y, 6, 12, {
      label: `${label}_sensor`,
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
    scene.load.atlas('rocket', RocketImage, RocketAtlas);
    scene.load.animation('rocket', RocketAnim);
  }
}
