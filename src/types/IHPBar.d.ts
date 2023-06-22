declare interface IHPBar extends Phaser.GameObjects.Graphics {
  get value();
  set value(value: number);
  init();
  draw();
  decrease(amount: number);
  removeHealthBar();
}
