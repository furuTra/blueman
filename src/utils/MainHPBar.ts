import Phaser from 'phaser';
import { IHPBar } from '~/utils/interfaces';

export default class MainHPBar extends Phaser.GameObjects.Graphics implements IHPBar {
  private _value: number;

  private pos: { x: number; y: number };

  private maxValue: number;

  get value() {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  constructor(
    scene: Phaser.Scene,
    pos = { x: 0, y: 0 },
    value: number = 100,
    maxValue: number = 100
  ) {
    super(scene);
    this._value = value;
    this.pos = pos;
    this.maxValue = maxValue;

    this.draw();
    scene.add.existing(this);
  }

  init() {
    this.value = this.maxValue;
    this.draw();
  }

  draw() {
    if (!this.active && !this.visible) {
      this.setActive(true).setVisible(true);
    }

    this.clear();

    const healthBarLength = 480;

    const healthBarHeight = 20;

    const perHealth = this.value / this.maxValue;

    // BackGround
    this.fillStyle(0x4d4d4d).fillRect(this.pos.x, this.pos.y, healthBarLength, healthBarHeight);

    // Health(Normal)
    this.fillStyle(0x80ff80);
    if (perHealth <= 0.5) {
      // Health(Warn)
      this.fillStyle(0xffc14d);
    }
    if (perHealth <= 0.2) {
      // Health(Danger)
      this.fillStyle(0xff6666);
    }

    this.fillRect(
      this.pos.x + 1,
      this.pos.y + 1,
      perHealth * (healthBarLength - 5),
      healthBarHeight - 5
    );
  }

  decrease(amount: number) {
    this._value -= amount;
    if (this._value < 0) this._value = 0;
    this.draw();
  }

  removeHealthBar() {
    this.setActive(false).setVisible(false);
  }
}
