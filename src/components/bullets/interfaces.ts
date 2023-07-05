import { TBulletKey } from './types';

export interface IBulletBody {
  readonly bodyKey: TBulletKey;
  readonly body: MatterJS.BodyType;
}

export interface IBullet extends Phaser.Physics.Matter.Sprite {
  readonly bulletBody: IBulletBody;
}
