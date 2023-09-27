import Phaser from 'phaser';
import eventsCenter from '~/events/EventsCenter';
import MoveEvents from '~/events/MoveEvents';
import SafeRoomScene from './SafeRoomScene';

export default class SceneController extends Phaser.Scene {
  static readonly sceneKey = 'scene_controller';

  constructor() {
    super({ key: SceneController.sceneKey });
  }

  static readonly firstScene = SafeRoomScene.sceneKey;

  private static _currentScene = SceneController.firstScene;

  static get currentScene() {
    return SceneController._currentScene;
  }

  static set currentScene(sceneKey: string) {
    SceneController._currentScene = sceneKey;
  }

  create() {
    this.scene.launch('ui_scene');

    this.scene.start(SceneController.currentScene);

    MoveEvents.createMoveEvents(this);
    // シーン跨ぎイベントを全体に公開
    eventsCenter.on('move-scene', this.moveScene, this);
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
}
