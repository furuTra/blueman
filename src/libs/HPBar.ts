import Phaser from 'phaser';
import { IHPBar } from './interfaces';

export default class HPBar extends Phaser.GameObjects.Graphics implements IHPBar {
  private _value: number;

  private _pos: TPos;

  private _maxValue: number;

  constructor(
    scene: Phaser.Scene,
    pos: TPos = { x: 0, y: 0 },
    value: number = 100,
    maxValue: number = 100
  ) {
    super(scene);
    this._value = value;
    this._pos = pos;
    this._maxValue = maxValue;

    this.setPosition(pos.x, pos.y);
    this.draw();
    scene.add.existing(this);
  }

  get value() {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  init() {
    this.value = this._maxValue;
    this.draw();
  }

  draw() {
    if (!this.active && !this.visible) {
      this.setActive(true);
      this.setVisible(true);
    }

    this.clear();

    const healthBarLength = 64;

    const healthBarHeight = 6;

    const perHealth = this._value / this._maxValue;

    // BackGround
    this.fillStyle(0x4d4d4d);
    this.fillRect(this._pos.x, this._pos.y, healthBarLength, healthBarHeight);

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
      this._pos.x + 1,
      this._pos.y + 1,
      perHealth * (healthBarLength - 2),
      healthBarHeight - 2
    );
  }

  decrease(amount: number) {
    this._value -= amount;
    if (this._value < 0) this._value = 0;
    this.draw();
  }

  removeHealthBar() {
    this.setActive(false);
    this.setVisible(false);
  }
}
