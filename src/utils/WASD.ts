import { IWASD } from './interfaces';

export default class WASD implements IWASD {
  readonly W: Phaser.Input.Keyboard.Key;

  readonly A: Phaser.Input.Keyboard.Key;

  readonly S: Phaser.Input.Keyboard.Key;

  readonly D: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene) {
    this.W = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  velocityX(speed: number): number {
    let x = 0;
    x += this.A.isDown ? -speed : 0;
    x += this.D.isDown ? speed : 0;
    return x;
  }

  velocityY(speed: number): number {
    let y = 0;
    y += this.W.isDown ? -speed : 0;
    y += this.S.isDown ? speed : 0;
    return y;
  }
}
