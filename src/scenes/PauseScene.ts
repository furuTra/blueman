import Phaser from 'phaser';
import ForwardIcon from '@assets/icons/forward.png';
import eventsCenter from '~/events/EventsCenter';

export default class PauseScene extends Phaser.Scene {
  static readonly sceneKey = 'pause_scene';

  constructor() {
    super(PauseScene.sceneKey);
  }

  preload() {
    this.load.image('forward', ForwardIcon);
  }

  create() {
    this.add
      .text(this.sys.canvas.width / 2, this.sys.canvas.height / 2 - 32, 'Restart', {
        fontFamily: 'arial',
        fontSize: '32px',
        color: '#ffffff',
        align: 'center',
      })
      .setOrigin(0.5);
    this.add
      .image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'forward')
      .setOrigin(0.5)
      .setInteractive()
      .on(
        'pointerup',
        function (this: Phaser.Scene) {
          eventsCenter.emit('resume-scene');
          // 先に元シーンの再開をしないと、シーンを閉じた際にエラーになる。
          this.scene.remove(PauseScene.sceneKey);
        },
        this
      );
  }
}
