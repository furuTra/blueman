import Phaser from 'phaser';
import Enemy from './Enemy';
import { IEnemy } from './interfaces';
import { TBodyKey } from '~/components/characters/types';

export default class EnemyPool extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene, config: Phaser.Types.GameObjects.Group.GroupConfig = {}) {
    const defaults: Phaser.Types.GameObjects.Group.GroupConfig = {
      classType: Enemy,
      maxSize: 5,
    };
    super(scene, Object.assign(defaults, config));
  }

  spawn(pos = { x: 0, y: 0 }, key: TBodyKey = 'droid') {
    const enemy: IEnemy = super.get(pos.x, pos.y, key);
    if (!enemy) return;

    enemy.setFixedRotation();

    enemy.anims.play({ key: `${enemy.charactorKey}_move` }, true);

    const spawnExisting = this.countActive(false) > 0;
    if (spawnExisting) {
      enemy.setActive(true).setVisible(true);
      enemy.showName();
      enemy.startTween();
      enemy.health.init();
      enemy.world.add(enemy.body);
    }

    return enemy;
  }

  reduceHP(enemy: IEnemy, damage: number) {
    enemy.health.decrease(damage);
    if (enemy.health.value <= 0) this.despawn(enemy);
  }

  despawn(enemy: IEnemy) {
    enemy.despawn();
    enemy.world.remove(enemy);
  }
}
