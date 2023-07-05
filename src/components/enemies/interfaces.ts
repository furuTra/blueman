import { IHPBar } from '~/libs/interfaces';

export interface IEnemy extends Phaser.Physics.Matter.Sprite {
  get health(): IHPBar;
  startTween(): void;
  removeName(): void;
  showName(): void;
  despawn(): void;
}
