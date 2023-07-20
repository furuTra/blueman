import Phaser from 'phaser';

export interface IHPBar extends Phaser.GameObjects.Graphics {
  get value(): number;
  set value(value: number);
  init(): void;
  draw(): void;
  decrease(amount: number): void;
  removeHealthBar(): void;
}

export interface IState {
  name: string;
  onEnter?: () => void;
  onUpdate?: (dt: number) => void;
  onExit?: () => void;
}

export interface IWASD {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
  velocityX(speed: number): number;
  velocityY(speed: number): number;
}

export interface IJoyStick {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  velocityX(speed: number): number;
  velocityY(speed: number): number;
}
