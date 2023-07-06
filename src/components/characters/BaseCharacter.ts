import Phaser from 'phaser';

export default abstract class BaseCharacter extends Phaser.Physics.Matter.MatterPhysics {
  constructor(scene: Phaser.Scene) {
    super(scene);
  }
}
