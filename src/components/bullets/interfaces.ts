import { TBulletKey } from './types';

export interface IBulletBody {
  readonly bodyKey: TBulletKey;
  readonly bodyType: MatterJS.BodyType;
}

export interface IBullet extends Phaser.Physics.Matter.Sprite {
  readonly bulletBody: IBulletBody;
}
