import Phaser from 'phaser';
import Property from '~/libs/Property';

export default class UIScene extends Phaser.Scene {
  private _hpBarPos = { x: 5, y: 25 };

  private _namePos = { x: 5, y: 5 };

  private _property?: Property;

  constructor() {
    super({ key: 'ui_scene' });
  }

  init() {
    this._property = this.registry.get('player');
  }

  draw() {
    if (!this._property) return;
    const healthBarLength = 480;
    const healthBarHeight = 20;
    const perHealth = this._property.hp / this._property.maxHp;
    const graphics = this.add.graphics();
    graphics
      .fillStyle(0x4d4d4d)
      .fillRect(this._hpBarPos.x, this._hpBarPos.y, healthBarLength, healthBarHeight);
    graphics.fillStyle(0x80ff80);
    if (perHealth <= 0.5) {
      // Health(Warn)
      graphics.fillStyle(0xffc14d);
    }
    if (perHealth <= 0.2) {
      // Health(Danger)
      graphics.fillStyle(0xff6666);
    }
    graphics.fillRect(
      this._hpBarPos.x + 1,
      this._hpBarPos.y + 1,
      perHealth * (healthBarLength - 2),
      healthBarHeight - 2
    );
  }

  create() {
    if (!this._property) return;
    this.add.text(this._namePos.x, this._namePos.y, this._property?.name, {
      fontFamily: 'arial',
      fontSize: '18px',
      color: '#f0f8ff',
      backgroundColor: '#4d4d4d',
    });
    this.draw();

    this.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        this.decrease(1);
      },
    });
  }

  decrease(amount: number) {
    if (!this._property) return;
    this._property.hp -= amount;
    if (this._property.hp < 0) this._property.hp = 0;
    this.draw();
  }
}
