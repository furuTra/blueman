import { TBulletKey } from './types';

export interface IBulletBody {
  readonly attack: number;
  readonly intervalTime: number;
  readonly bodyKey: TBulletKey;
  readonly bodyType: MatterJS.BodyType;
}

export interface IBullet extends Phaser.Physics.Matter.Sprite {
  get attack(): number;
  get intervalTime(): number;
  readonly bulletBody: IBulletBody;
}
