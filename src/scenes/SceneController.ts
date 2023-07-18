import Phaser from 'phaser';
import Property from '~/utils/Property';
import eventsCenter from '~/events/EventsCenter';
import GameOverScene from '~/scenes/GameOverScene';

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
    // ゲームオーバーイベントを全体に公開
    eventsCenter.on('gameover-scene', this.gameOver, this);
    // ゲーム再開イベントを全体に公開
    eventsCenter.on('start-scene', this.startScene, this);
  }

  update() {
    // const data = this.registry.get('player');
    // console.log(data);
  }

  startScene() {
    if (!this._sceneKey) return;
    this.scene.start(this._sceneKey);
    eventsCenter.emit('set-max-hp');
  }

  pause() {
    if (!this._sceneKey) return;
    this.scene.pause(this._sceneKey);
  }

  resume() {
    if (!this._sceneKey) return;
    this.scene.resume(this._sceneKey);
  }

  gameOver() {
    if (!this._sceneKey) return;
    this.scene.pause(this._sceneKey);
    this.scene.add('gameover_scene', new GameOverScene(), true);
  }
}
