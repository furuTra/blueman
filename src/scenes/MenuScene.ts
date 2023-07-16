import Phaser from 'phaser';
import CrossIcon from '@assets/icons/cross.png';
import ReturnIcon from '@assets/icons/return.png';
import CheckmarkIcon from '@assets/icons/checkmark.png';
import eventsCenter from '~/events/EventsCenter';

export default class MenuScene extends Phaser.Scene {
  static readonly sceneKey = 'menu_scene';

  private _backBoard?: Phaser.GameObjects.Graphics;

  constructor() {
    super(MenuScene.sceneKey);
  }

  preload() {
    this.load.image('cross', CrossIcon);
    this.load.image('return', ReturnIcon);
    this.load.image('checkmark', CheckmarkIcon);
  }

  create() {
    this._backBoard = this.add.graphics();
    this._backBoard.fillStyle(0xffcc33, 1).fillRect(100, 200, 600, 300);

    // ×ボタン
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

    // キャンセルボタン
    this.createButton(100, 500, 'cancel', 'return', () => {
      console.log('cancel');
    });

    // 決定ボタン
    this.createButton(200, 500, 'ok!', 'checkmark', () => {
      console.log('ok');
    });
  }

  createButton(x: number, y: number, label: string, icon: string, callback: () => void) {
    const iconImg = this.add.image(0, 0, icon);
    const button = this.add
      .text(0, 0, label, {
        fontFamily: 'arial',
        fontSize: '32px',
        color: '#ffffff',
        align: 'center',
        backgroundColor: '#f2bd61',
      })
      .setOrigin(0, 0.5)
      .setPadding({ left: iconImg.width })
      .setInteractive()
      .on('pointerdown', callback)
      .on('pointerover', () => {
        button.setStyle({ fill: '#f39c12' });
        iconImg.setTintFill(0xf39c12);
      })
      .on('pointerout', () => {
        button.setStyle({ fill: '#ffffff' });
        iconImg.setTintFill(0xffffff);
      });
    this.add.container(x, y, [button, iconImg]);
  }
}
