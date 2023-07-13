import Phaser from 'phaser';
import CrossIcon from '@assets/icons/cross.png';
import eventsCenter from '~/events/EventsCenter';

export default class MenuScene extends Phaser.Scene {
  static readonly sceneKey = 'menu_scene';

  constructor() {
    super(MenuScene.sceneKey);
  }

  preload() {
    this.load.image('cross', CrossIcon);
  }

  create() {
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffcc33, 1);
    graphics.fillRect(100, 200, 600, 300);

    this.add
      .image(650, 200, 'cross')
      .setOrigin(0)
      .setInteractive()
      .on(
        'pointerup',
        function (this: Phaser.Scene) {
          eventsCenter.emit('resume-scene');
          // 先に元シーンの再開をしないと、シーンを閉じた際にエラーになる。
          this.scene.remove(MenuScene.sceneKey);
        },
        this
      );
  }
}
