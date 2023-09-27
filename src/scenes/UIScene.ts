import Phaser from 'phaser';
import Property from '~/models/Property';
import eventsCenter from '~/events/EventsCenter';
import MainHPBar from '~/utils/MainHPBar';
import { IHPBar } from '~/utils/interfaces';
import MenuScene from './MenuScene';
import PauseScene from './PauseScene';

import JoyStick from '~/utils/JoyStick';
import SceneController from './SceneController';

import ButtonHelper from "../ui/ButtonHelper";

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
    // joyStickを全体に公開
    const joyStick = new JoyStick(this);
    this.registry.set('joyStick', joyStick);

    const property: Property = this.registry.get('player');
    this._property = property;
  }

  create() {
    this._playerHPBar = new MainHPBar(
      this,
      { x: this._hpBarPos.x, y: this._hpBarPos.y },
      this._property?.hp,
      this._property?.maxHp
    );
    this.createPlayerHeader();
    this.createPlayerHP();
    this.createPlayerHeader();
    this._playerHPBar?.init();

    const settingButton = ButtonHelper.setting(this, this.sys.canvas.width * 0.9, 32);
    settingButton
      .addListener('pointerup')
      .on(
        'pointerup',
        function (this: Phaser.Scene) {
          if (!this.scene.isActive(SceneController.currentScene)) return;
          this.scene.add(MenuScene.sceneKey, new MenuScene(), true);
          this.scene.pause(SceneController.currentScene);
        },
        this
      );

    const pauseButton = ButtonHelper.pause(this, this.sys.canvas.width * 0.8, 32);
    pauseButton
      .addListener('pointerup')
      .on(
        'pointerup',
        function (this: Phaser.Scene) {
          if (!this.scene.isActive(SceneController.currentScene)) return;
          this.scene.add(PauseScene.sceneKey, new PauseScene(), true);
          eventsCenter.emit('pause-scene');
        },
        this
      );

    // HPを減らすイベントを全体に公開
    eventsCenter.on('decrease-player-hp', this.decrease, this);
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      eventsCenter.off('decrease-player-hp', this.decrease, this);
    });

    // HPを全快するイベントを全体に公開
    eventsCenter.on('set-max-hp', this.setMaxHp, this);
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
    if (this._property.hp <= 0) {
      this._property.hp = 0;
      eventsCenter.emit('gameover-scene');
    }
    this._playerHPBar?.decrease(amount);
  }

  setMaxHp() {
    if (!this._property) return;
    this._property.hp = this._property.maxHp;
    this._playerHPBar?.init();
  }
}
