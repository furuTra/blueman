declare interface IEnemy extends Phaser.Physics.Matter.Sprite {
  get health(): IHPBar;
  startTween();
  removeName();
  showName();
}
