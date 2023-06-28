import BulletImage from '@assets/bullet/bullet.png';
import BulletAtlas from '@assets/bullet/bullet_atlas.json';
import BulletAnim from '@assets/bullet/bullet_anim.json';
import { IBullet } from './interfaces';

export default class Bullet extends Phaser.Physics.Matter.Sprite implements IBullet {
  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    const options: Phaser.Types.Physics.Matter.MatterBodyConfig = {
      label: 'bullet',
      isSensor: true,
      friction: 0,
      frictionAir: 0,
    };
    super(scene.matter.world, x, y, key, '', options);
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.atlas('bullet', BulletImage, BulletAtlas);
    scene.load.animation('bullet', BulletAnim);
  }
}
