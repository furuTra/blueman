declare interface IBulletPool extends Phaser.GameObjects.Group {
  set inc();
  get inc(): TPos;
  fire(pos?: TPos, mouse?: TPos, key?: string);
  destroyBullet(bullet: Phaser.Physics.Matter.Sprite);
}

declare interface IEnemyPool extends Phaser.GameObjects.Group {
  spawn(pos: TPos, key?: string);
  despawn(enemy: IEnemy);
  reduceHP(enemy: IEnemy);
}

declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    bulletPool(): IBulletPool;
    enemyPool(): IEnemyPool;
  }
}
