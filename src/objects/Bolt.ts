import BoltImage from '@assets/bolt/bolt.png';
import BoltAtlas from '@assets/bolt/bolt_atlas.json';
import BoltAnim from '@assets/bolt/bolt_anim.json';
import { IBullet } from './interfaces';

export default class Bolt extends Phaser.Physics.Matter.Sprite implements IBullet {
  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    const options: Phaser.Types.Physics.Matter.MatterBodyConfig = {
      label: 'bolt',
      isSensor: true,
      friction: 0,
      frictionAir: 0,
    };
    super(scene.matter.world, x, y, key, key, options);
    this.setData({ attack: 3 });
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.atlas('bolt', BoltImage, BoltAtlas);
    scene.load.animation('bolt', BoltAnim);
  }
}
