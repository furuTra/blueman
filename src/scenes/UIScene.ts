import Phaser from 'phaser';
import Property from '~/libs/Property';
import eventsCenter from '~/events/EventsCenter';
import MainHPBar from '~/libs/MainHPBar';
import { IHPBar } from '~/libs/interfaces';

export default class UIScene extends Phaser.Scene {
  private _hpBarPos = { x: 5, y: 25 };

  private _namePos = { x: 5, y: 5 };

  private _property?: Property;

  private _playerName?: Phaser.GameObjects.Text;

  private _playerHPBar?: IHPBar;

  private _playerHP?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'ui_scene' });
  }

  init() {
    const property: Property = this.registry.get('player');
    this._property = property;
    this._playerHPBar = new MainHPBar(
      this,
      { x: this._hpBarPos.x, y: this._hpBarPos.y },
      this._property.hp,
      this._property.maxHp
    );
    this.createPlayerHeader();
    this.createPlayerHP();
  }

  create() {
    this.createPlayerHeader();
    this._playerHPBar?.init();

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
    this._playerHPBar?.decrease(amount);
  }
}
