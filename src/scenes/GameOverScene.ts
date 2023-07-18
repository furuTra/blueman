import Phaser from 'phaser';
import HomeIcon from '@assets/icons/home.png';
import ReturnIcon from '@assets/icons/return.png';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameover_scene' });
  }

  preload() {
    this.load.image('home', HomeIcon);
    this.load.image('return', ReturnIcon);
  }

  create() {
    this.add
      .rectangle(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        this.sys.canvas.width,
        this.sys.canvas.height,
        0xa9a9a9,
        0.5
      )
      .setOrigin(0.5);
    this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY, 'GAME OVER', {
        fontFamily: 'arial',
        fontSize: '64px',
        color: '#ffffff',
        align: 'center',
      })
      .setOrigin(0.5);
    // returnボタンを追加
    this.createIcon(
      this.cameras.main.centerX - 100,
      this.cameras.main.centerY + 100,
      'return',
      () => {
        console.log('return');
      }
    );
    // homeボタンを追加
    this.createIcon(
      this.cameras.main.centerX + 100,
      this.cameras.main.centerY + 100,
      'home',
      () => {
        console.log('home');
      }
    );
  }

  createIcon(x: number, y: number, icon: string, callback: () => void) {
    const iconImg = this.add.image(x, y, icon).setOrigin(0.5);
    iconImg.setInteractive().on('pointerdown', callback);
  }
}
