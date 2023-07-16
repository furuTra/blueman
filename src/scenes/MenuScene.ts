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
    const buttonX = this.add
      .image(650, 200, 'cross')
      .setOrigin(0)
      .setInteractive()
      .on('pointerdown', this.resumeScene, this)
      .on('pointerover', () => {
        buttonX.setTintFill(0xf39c12);
      })
      .on('pointerout', () => {
        buttonX.setTintFill(0xffffff);
      });

    // キャンセルボタン
    this.createButton(100, 450, 'cancel', 'return', () => {
      this.resumeScene();
      console.log('cancel');
    });

    // 決定ボタン
    this.createButton(300, 450, 'ok!', 'checkmark', () => {
      this.resumeScene();
      console.log('ok');
    });
  }

  resumeScene() {
    eventsCenter.emit('resume-scene');
    // 先に元シーンの再開をしないと、シーンを閉じた際にエラーになる。
    this.scene.remove(MenuScene.sceneKey);
  }

  createButton(x: number, y: number, label: string, icon: string, callback: () => void) {
    const iconImg = this.add.image(0, 0, icon).setOrigin(0, 0.5);
    const buttonText = this.add
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
        buttonText.setStyle({ fill: '#f39c12' });
        iconImg.setTintFill(0xf39c12);
      })
      .on('pointerout', () => {
        buttonText.setStyle({ fill: '#ffffff' });
        iconImg.setTintFill(0xffffff);
      });
    this.add.container(x, y, [buttonText, iconImg]);
  }
}
