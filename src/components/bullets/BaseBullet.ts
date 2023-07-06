import Phaser from 'phaser';

export default abstract class BaseBullet extends Phaser.Physics.Matter.MatterPhysics {
  constructor(scene: Phaser.Scene) {
    super(scene);
  }
}
