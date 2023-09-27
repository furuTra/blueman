import Phaser from 'phaser';
import eventsCenter from '~/events/EventsCenter';
import ButtonHelper from '~/ui/ButtonHelper';

export default class PauseScene extends Phaser.Scene {
  static readonly sceneKey = 'pause_scene';

  constructor() {
    super(PauseScene.sceneKey);
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
    const play = ButtonHelper.play(this, this.sys.canvas.width / 2, this.sys.canvas.height / 2 + 32);
    play
      .addListener('pointerup')
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
