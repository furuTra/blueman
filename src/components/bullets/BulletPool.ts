import Phaser from 'phaser';
import Bullet from './Bullet';
import { IBullet } from './interfaces';
import { TBulletKey } from './types';

export default class BulletPool extends Phaser.GameObjects.Group implements IBulletPool {
  private _inc: { x: number; y: number };

  set inc(inc: { x: number; y: number }) {
    this._inc = inc;
  }

  get inc(): { x: number; y: number } {
    return this._inc;
  }

  constructor(scene: Phaser.Scene, config: Phaser.Types.GameObjects.Group.GroupConfig = {}) {
    const defaults: Phaser.Types.GameObjects.Group.GroupConfig = {
      classType: Bullet,
      maxSize: 50,
    };
    super(scene, Object.assign(defaults, config));
    this._inc = { x: 0, y: 0 };
  }

  fire(pos = { x: 0, y: 0 }, mouse = { x: 0, y: 0 }, key: TBulletKey) {
    const bullet: IBullet = super.get(pos.x, pos.y, key);
    if (!bullet) {
      return;
    }

    const angleX = () => {
      return pos.x - this.scene.cameras.main.scrollX;
    };

    const angleY = () => {
      return pos.y - this.scene.cameras.main.scrollY;
    };

    const bulletAngle = Phaser.Math.Angle.Between(mouse.x, mouse.y, angleX(), angleY());
    bullet.setRotation(bulletAngle - Phaser.Math.DegToRad(90));
    this.inc = {
      x: Math.cos(bulletAngle),
      y: Math.sin(bulletAngle),
    };

    const speed = Phaser.Math.GetSpeed(10000, 1);
    const incXSpeed = speed * -this.inc.x;
    const incYSpeed = speed * -this.inc.y;
    bullet.setScale(2.5, 2.5).setFixedRotation().setVelocity(incXSpeed, incYSpeed);
    bullet.anims.play({ key }, true);

    const spawnExisting = this.countActive(false) > 0;
    if (spawnExisting) {
      bullet.setActive(true).setVisible(true);
      bullet.world.add(bullet.body);
    }

    return bullet;
  }

  destroyBullet(bullet: IBullet) {
    bullet.setActive(false).setVisible(false).removeInteractive();
    bullet.world.remove(bullet.body);
  }
}
