import eventsCenter from './EventsCenter';
import SceneController from '~/scenes/SceneController';
import GameOverScene from '~/scenes/GameOverScene';

export default class MoveEvents {
  private _scene: Phaser.Scene;

  private constructor(scene: Phaser.Scene) {
    this._scene = scene;
    // シーン停止イベントを全体に公開
    eventsCenter.on('pause-scene', this.pause, this);
    // シーン再開イベントを全体に公開
    eventsCenter.on('resume-scene', this.resume, this);
    // ゲームオーバーイベントを全体に公開
    eventsCenter.on('gameover-scene', this.gameOver, this);
  }

  static createMoveEvents(scene: Phaser.Scene) {
    new MoveEvents(scene);
    return eventsCenter;
  }

  private pause() {
    this._scene.scene.pause(SceneController.currentScene);
  }

  private resume() {
    this._scene.scene.resume(SceneController.currentScene);
  }

  private gameOver() {
    this._scene.scene.pause(SceneController.currentScene);
    this._scene.scene.add(GameOverScene.sceneKey, new GameOverScene(), true);
  }
}
