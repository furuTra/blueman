import Phaser from 'phaser';
import Property from '~/models/Property';
import eventsCenter from '~/events/EventsCenter';
import GameOverScene from '~/scenes/GameOverScene';
import SafeRoomScene from './SafeRoomScene';

export default class SceneController extends Phaser.Scene {
  constructor() {
    super({ key: 'scene_controller' });
    this._property = new Property();
  }

  private _property: Property;

  static readonly firstScene = SafeRoomScene.sceneKey;

  private static _currentScene = SceneController.firstScene;

  static get currentScene() {
    return SceneController._currentScene;
  }

  static set currentScene(sceneKey: string) {
    SceneController._currentScene = sceneKey;
  }

  init() {
    this.registry.set('player', this._property);
  }

  create() {
    this.scene.launch('ui_scene');

    this.scene.start(SceneController.currentScene);
    // シーン停止イベントを全体に公開
    eventsCenter.on('pause-scene', this.pause, this);
    // シーン再開イベントを全体に公開
    eventsCenter.on('resume-scene', this.resume, this);
    // シーン跨ぎイベントを全体に公開
    eventsCenter.on('move-scene', this.moveScene, this);
    // ゲームオーバーイベントを全体に公開
    eventsCenter.on('gameover-scene', this.gameOver, this);
    // ゲーム再開イベントを全体に公開
    eventsCenter.on('start-scene', this.startScene, this);
  }

  moveScene(nextScene: string, currentScene: string) {
    SceneController.currentScene = nextScene;
    this.scene.start(nextScene);
    this.scene.stop(currentScene);
  }

  startScene() {
    SceneController.currentScene = SceneController.firstScene;
    this.scene.start(SceneController.currentScene);
    eventsCenter.emit('set-max-hp');
  }

  pause() {
    if (!SceneController.currentScene) return;
    this.scene.pause(SceneController.currentScene);
  }

  resume() {
    if (!SceneController.currentScene) return;
    this.scene.resume(SceneController.currentScene);
  }

  gameOver() {
    if (!SceneController.currentScene) return;
    this.scene.pause(SceneController.currentScene);
    this.scene.add(GameOverScene.sceneKey, new GameOverScene(), true);
  }
}
