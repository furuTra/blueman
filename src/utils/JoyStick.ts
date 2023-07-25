import Phaser from 'phaser';
import VirtualJoyStickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin';
import { IJoyStick } from './interfaces';

export default class joyStick implements IJoyStick {
  readonly up: Phaser.Input.Keyboard.Key;

  readonly down: Phaser.Input.Keyboard.Key;

  readonly left: Phaser.Input.Keyboard.Key;

  readonly right: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene) {
    const joyStick = this.createJoyStick(scene);
    this.up = joyStick.up;
    this.down = joyStick.down;
    this.left = joyStick.left;
    this.right = joyStick.right;
  }

  createJoyStick(scene: Phaser.Scene) {
    const base = scene.add.circle(0, 0, 40, 0x888888, 0.5);
    const thumb = scene.add.circle(0, 0, 20, 0xcccccc, 0.8);
    const joyStick = scene.plugins.get('rexVirtualJoystick') as VirtualJoyStickPlugin;
    return joyStick
      .add(scene, {
        x: 50,
        y: 550,
        radius: 30,
        base,
        thumb,
      })
      .createCursorKeys();
  }

  velocityX(speed: number): number {
    let x = 0;
    x += this.left.isDown ? -speed : 0;
    x += this.right.isDown ? speed : 0;
    return x;
  }

  velocityY(speed: number): number {
    let y = 0;
    y += this.up.isDown ? -speed : 0;
    y += this.down.isDown ? speed : 0;
    return y;
  }
}
