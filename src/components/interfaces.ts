import { ICharacter } from './characters/interfaces';

export interface IPlayer extends Phaser.Physics.Matter.Sprite {
  charactor: ICharacter;
  mouse: { x: number; y: number };
  get isMouseDown(): boolean;
  create(): void;
  update(dt: number): void;
}
