import { IHPBar } from '~/libs/interfaces';
import { TBodyKey } from '../characters/types';
import { ICharacter } from '../characters/interfaces';

export interface IEnemy extends Phaser.Physics.Matter.Sprite {
  readonly charactorKey: TBodyKey;
  readonly charactor: ICharacter;
  get health(): IHPBar;
  startTween(): void;
  removeName(): void;
  showName(): void;
  despawn(): void;
}
