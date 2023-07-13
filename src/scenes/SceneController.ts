import Phaser from 'phaser';
import Property from '~/libs/Property';
import eventsCenter from '~/events/EventsCenter';

export default class SceneController extends Phaser.Scene {
  constructor() {
    super({ key: 'scene_controller' });
    this._property = new Property();
  }

  private _property: Property;

  private _sceneKey?: string;

  set sceneKey(sceneKey: string) {
    this._sceneKey = sceneKey;
  }

  init() {
    this.registry.set('player', this._property);
  }

  create() {
    this.scene.launch('ui_scene');
    this._sceneKey = 'battle_scene';
    this.scene.start(this._sceneKey);
    // シーン停止イベントを全体に公開
    eventsCenter.on('pause-scene', this.pause, this);
    // シーン再開イベントを全体に公開
    eventsCenter.on('resume-scene', this.resume, this);
  }

  update() {
    // const data = this.registry.get('player');
    // console.log(data);
  }

  pause() {
    if (!this._sceneKey) return;
    this.scene.pause(this._sceneKey);
  }

  resume() {
    if (!this._sceneKey) return;
    this.scene.resume(this._sceneKey);
  }
}
