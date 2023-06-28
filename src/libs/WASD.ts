import { IWASD } from './interfaces';

export default class WASD implements IWASD {
  W: Phaser.Input.Keyboard.Key;

  A: Phaser.Input.Keyboard.Key;

  S: Phaser.Input.Keyboard.Key;

  D: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene) {
    this.W = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }
}
