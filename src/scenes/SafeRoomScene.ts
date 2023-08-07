import Phaser from 'phaser';
import SafeRoom1 from '~/components/maps/safeRooms/SafeRoom1';
import { IPlayer } from '~/components/interfaces';
import Player from '~/components/Player';
import Blue from '~/components/characters/Blue';
import eventsCenter from '~/events/EventsCenter';

export default class SafeRoomScene extends Phaser.Scene {
  static readonly sceneKey = 'safe_room_scene';

  private _player?: IPlayer;

  private _worldWidthEnd = 0;

  private _worldHeightEnd = 0;

  constructor() {
    super({ key: SafeRoomScene.sceneKey });
  }

  preload(): void {
    Blue.preload(this);
    SafeRoom1.preload(this);
  }

  private createCamera() {
    if (this._player)
      this.cameras.main
        .startFollow(this._player, true)
        .setBounds(0, 0, this._worldWidthEnd, this._worldHeightEnd);
    return this.cameras.main;
  }

  create(): void {
    this._worldHeightEnd = 1440;
    this._worldWidthEnd = 1920;

    const map = new SafeRoom1(this);
    map.create();

    this._player = new Player(this, 'blue', 400, 300);
    this._player.create();

    this.createCamera();

    this.matter.world.setBounds(0, 0, this._worldWidthEnd, this._worldHeightEnd);
  }

  update(_time: number, delta: number): void {
    if (this._player) {
      this._player.update(delta);
      // シーン移動を追加
      if (this._player.x >= this._worldWidthEnd - 16) {
        eventsCenter.emit('move-scene', 'battle_scene', SafeRoomScene.sceneKey);
      }
    }
  }
}
