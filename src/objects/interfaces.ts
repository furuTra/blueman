import Phaser from 'phaser';
import { IHPBar } from '~/libs/interfaces';
import { TAnim } from './types';

export interface IEnemy extends Phaser.Physics.Matter.Sprite {
  get health(): IHPBar;
  startTween(): void;
  removeName(): void;
  showName(): void;
}

export interface IPlayer {
  body: IBody;
  mouse: { x: number; y: number };
  get isMouseDown(): boolean;
  create(): void;
  update(dt: number): void;
}

export interface IBody extends Phaser.Physics.Matter.Sprite {
  set animPrefix(animPrefix: TAnim);
  get animPrefix(): TAnim;
  get animKey(): string;
  set isFlip(isFlip: boolean);
  get isFlip(): boolean;
}

export interface IBullet extends Phaser.Physics.Matter.Sprite {}

