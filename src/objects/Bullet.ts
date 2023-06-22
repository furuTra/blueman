import Phaser from 'phaser';

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
    scene.load.atlas(
      'bullet',
      './src/assets/bullet/bullet.png',
      './src/assets/bullet/bullet_atlas.json'
    );
    scene.load.animation('bullet', './src/assets/bullet/bullet_anim.json');
  }
}
