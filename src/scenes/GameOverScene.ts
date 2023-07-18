import Phaser from 'phaser';
import HomeIcon from '@assets/icons/home.png';
import ReturnIcon from '@assets/icons/return.png';
import eventsCenter from '~/events/EventsCenter';

export default class GameOverScene extends Phaser.Scene {
  static readonly sceneKey = 'gameover_scene';

  constructor() {
    super(GameOverScene.sceneKey);
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
        this.restartGame();
        console.log('return');
      }
    );
    // homeボタンを追加
    this.createIcon(
      this.cameras.main.centerX + 100,
      this.cameras.main.centerY + 100,
      'home',
      () => {
        this.restartGame();
        console.log('home');
      }
    );
  }

  restartGame() {
    eventsCenter.emit('start-scene');
    this.scene.remove(GameOverScene.sceneKey);
  }

  createIcon(x: number, y: number, icon: string, callback: () => void) {
    const iconImg = this.add.image(x, y, icon).setOrigin(0.5);
    iconImg.setInteractive().on('pointerdown', callback);
  }
}
