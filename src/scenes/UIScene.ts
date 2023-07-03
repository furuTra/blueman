import Phaser from 'phaser';
import Property from '~/libs/Property';
import eventsCenter from '~/events/EventsCenter';

export default class UIScene extends Phaser.Scene {
  private _hpBarPos = { x: 5, y: 25 };

  private _namePos = { x: 5, y: 5 };

  private _property?: Property;

  private _playerName?: Phaser.GameObjects.Text;

  private _playerHPBar?: Phaser.GameObjects.Graphics;

  private _playerHP?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'ui_scene' });
  }

  init() {
    this._property = this.registry.get('player');
    this._playerHPBar = this.add.graphics();
    this.createPlayerHeader();
    this.createPlayerHP();
  }

  draw() {
    if (!this._property || !this._playerHPBar) return;
    this._playerHPBar.clear();
    const healthBarLength = 480;
    const healthBarHeight = 20;
    const perHealth = this._property.hp / this._property.maxHp;
    this._playerHPBar
      .fillStyle(0x4d4d4d)
      .fillRect(this._hpBarPos.x, this._hpBarPos.y, healthBarLength, healthBarHeight);
    this._playerHPBar.fillStyle(0x80ff80);
    if (perHealth <= 0.5) {
      // Health(Warn)
      this._playerHPBar.fillStyle(0xffc14d);
    }
    if (perHealth <= 0.2) {
      // Health(Danger)
      this._playerHPBar.fillStyle(0xff6666);
    }
    this._playerHPBar.fillRect(
      this._hpBarPos.x + 1,
      this._hpBarPos.y + 1,
      perHealth * (healthBarLength - 2),
      healthBarHeight - 2
    );
  }

  create() {
    this.createPlayerHeader();
    this.draw();

    // HPを減らすイベントを全体に公開
    eventsCenter.on('decrease-player-hp', this.decrease, this);

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('decrease-player-hp', this.decrease, this);
    });
  }

  createPlayerHeader() {
    if (!this._property) return;
    this._playerName = this.add.text(this._namePos.x, this._namePos.y, this._property?.name, {
      fontFamily: 'arial',
      fontSize: '18px',
      color: '#f0f8ff',
      backgroundColor: '#4d4d4d',
    });
  }

  createPlayerHP() {
    if (!this._playerName || !this._property) return;
    this._playerHP = this.add.text(
      this._namePos.x + this._playerName.width + 10,
      this._namePos.y,
      `${this._property.hp} / ${this._property.maxHp}`,
      {
        fontFamily: 'arial',
        fontSize: '18px',
        color: '#f0f8ff',
        backgroundColor: '#4d4d4d',
      }
    );
  }

  update() {
    this._playerHP?.setText(`${this._property?.hp} / ${this._property?.maxHp}`);
  }

  decrease(amount: number) {
    if (!this._property) return;
    this._property.hp -= amount;
    if (this._property.hp < 0) this._property.hp = 0;
    this.draw();
  }
}
