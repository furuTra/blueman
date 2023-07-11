import Phaser from 'phaser';
import CrossIcon from '@assets/icons/cross.png';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('menu_scene');
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
          this.scene.resume('battle_scene');
          // 先に元シーンの再開をしないと、シーンを閉じた際にエラーになる。
          this.scene.remove('menu_scene');
        },
        this
      );
  }
}
