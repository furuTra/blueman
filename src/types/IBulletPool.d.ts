declare interface IBulletPool extends Phaser.GameObjects.Group {
  set inc(inc: { x: number; y: number });
  get inc(): { x: number; y: number };
  fire(pos?: { x: number; y: number }, mouse?: { x: number; y: number }, key?: string);
  destroyBullet(bullet: Phaser.Physics.Matter.Sprite);
}

declare interface IEnemyPool extends Phaser.GameObjects.Group {
  spawn(pos: { x: number; y: number }, key?: string);
  despawn(enemy: Phaser.Physics.Matter.Sprite);
  reduceHP(enemy: Phaser.Physics.Matter.Sprite, damage: number);
}

declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    bulletPool(): IBulletPool;
    enemyPool(): IEnemyPool;
  }
}
