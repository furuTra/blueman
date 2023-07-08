import { TBulletKey } from './types';
import getBulletLists from './BulletLists';
import { IBulletBody, IBullet } from './interfaces';

export default class Bullet extends Phaser.Physics.Matter.Sprite implements IBullet {
  readonly bulletBody: IBulletBody;

  private _intervalTime: number;

  private _attack: number;

  get intervalTime(): number {
    return this._intervalTime;
  }

  get attack(): number {
    return this._attack;
  }

  constructor(scene: Phaser.Scene, x: number, y: number, key: TBulletKey) {
    const options: Phaser.Types.Physics.Matter.MatterBodyConfig = {
      label: 'bullet',
    };
    super(scene.matter.world, x, y, key, '', options);
    const bulletBody = getBulletLists(scene, x, y).get(key);
    this.bulletBody = bulletBody!();
    this.setExistingBody(this.bulletBody.bodyType);
    this._intervalTime = this.bulletBody.intervalTime;
    this._attack = this.bulletBody.attack;
  }
}
