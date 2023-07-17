import Phaser from 'phaser';
import CrossIcon from '@assets/icons/cross.png';
import ReturnIcon from '@assets/icons/return.png';
import CheckmarkIcon from '@assets/icons/checkmark.png';
import eventsCenter from '~/events/EventsCenter';

export default class MenuScene extends Phaser.Scene {
  static readonly sceneKey = 'menu_scene';

  constructor() {
    super(MenuScene.sceneKey);
  }

  preload() {
    this.load.image('cross', CrossIcon);
    this.load.image('return', ReturnIcon);
    this.load.image('checkmark', CheckmarkIcon);
  }

  create() {
    const backBoardWidth = 600;
    const backBoardHeight = 300;
    const backBoard = this.add
      .rectangle(0, 0, backBoardWidth, backBoardHeight, 0xffcc33)
      .setOrigin(0.5);

    // ×ボタン
    const buttonX = this.add
      .image(0, 0, 'cross')
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', this.resumeScene, this)
      .on('pointerover', () => {
        buttonX.setTintFill(0xf39c12);
      })
      .on('pointerout', () => {
        buttonX.setTintFill(0xffffff);
      });
    buttonX.setPosition(
      backBoardWidth / 2 - buttonX.width / 2,
      -(backBoardHeight / 2 - buttonX.height / 2)
    );

    // キャンセルボタン
    const cancelButton = this.createButton(-200, 100, 'cancel', 'return', () => {
      this.resumeScene();
      console.log('cancel');
    });

    // 決定ボタン
    const okButton = this.createButton(150, 100, 'ok!', 'checkmark', () => {
      this.resumeScene();
      console.log('ok');
    });
    this.add.container(this.cameras.main.centerX, this.cameras.main.centerY, [
      backBoard,
      buttonX,
      cancelButton,
      okButton,
    ]);
  }

  resumeScene() {
    eventsCenter.emit('resume-scene');
    // 先に元シーンの再開をしないと、シーンを閉じた際にエラーになる。
    this.scene.remove(MenuScene.sceneKey);
  }

  createButton(x: number, y: number, label: string, icon: string, callback: () => void) {
    const iconImg = this.add.image(0, 0, icon).setOrigin(0.5);
    const buttonText = this.add
      .text(0, 0, label, {
        fontFamily: 'arial',
        fontSize: '32px',
        color: '#ffffff',
        align: 'center',
      })
      .setOrigin(0, 0.5)
      .setPadding({ left: iconImg.width, right: 5 })
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
    const backBoard = this.add
      .rectangle(0, 0, buttonText.width, iconImg.height, 0xf2bd61)
      .setOrigin(0.5);
    iconImg.setPosition(-(backBoard.width / 2 - iconImg.width / 2), 0);
    buttonText.setPosition(-backBoard.width / 2, 0);
    return this.add.container(x, y, [backBoard, buttonText, iconImg]);
  }
}
