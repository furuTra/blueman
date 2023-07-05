import Phaser from 'phaser';
import Bolt from '~/components/bullets/Bolt';
import BulletPool from '~/components/bullets/BulletPool';
import Blue from '~/components/characters/Blue';
import Player from '~/components/Player';
import EnemyPool from '~/components/enemies/EnemyPool';
import Droid from '~/components/characters/Droid';
import Map1 from '~/maps/Map1';
import { IPlayer } from '~/components/interfaces';
import eventsCenter from '~/events/EventsCenter';

export default class BattleScene extends Phaser.Scene {
  private bulletGroup?: IBulletPool;

  private enemyGroup?: IEnemyPool;

  private player?: IPlayer;

  private _lastFired = 0;

  private worldWidthEnd = 0;

  private worldHeightEnd = 0;

  constructor() {
    super({ key: 'battle_scene' });
  }

  preload(): void {
    Bolt.preload(this);
    Blue.preload(this);
    Droid.preload(this);
    Map1.preload(this);
  }

  init() {
    Phaser.GameObjects.GameObjectFactory.register(
      'bulletPool',
      function (this: Phaser.GameObjects.GameObjectFactory) {
        const group = new BulletPool(this.scene);
        return group;
      }
    );
    Phaser.GameObjects.GameObjectFactory.register(
      'enemyPool',
      function (this: Phaser.GameObjects.GameObjectFactory) {
        const group = new EnemyPool(this.scene);
        return group;
      }
    );
  }

  private createCamera() {
    if (this.player)
      this.cameras.main
        .startFollow(this.player, true)
        .setBounds(0, 0, this.worldWidthEnd, this.worldHeightEnd);

    return this.cameras.main;
  }

  create(): void {
    this.worldWidthEnd = this.sys.canvas.width * 2;
    this.worldHeightEnd = this.sys.canvas.height * 2;

    this.bulletGroup = this.add.bulletPool();
    this.enemyGroup = this.add.enemyPool();

    const map = new Map1(this);
    map.create();

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        const posX = Phaser.Math.Between(this.worldWidthEnd - 64, this.worldWidthEnd);
        const posY = Phaser.Math.Between(64, this.worldHeightEnd - 64);
        this.enemyGroup?.spawn({ x: posX, y: posY }, 'droid');
      },
    });

    this.player = new Player(this, 'blue', 400, 300);
    this.player.create();

    this.createCamera();

    this.matter.world
      .setBounds(0, 0, this.worldWidthEnd, this.worldHeightEnd)
      .on(
        'collisionstart',
        (
          _event: Phaser.Physics.Matter.Events.CollisionStartEvent,
          bodyA: MatterJS.BodyType,
          bodyB: MatterJS.BodyType
        ) => {
          let bullets;
          let enemies;
          if (bodyA.label === 'bullet' && bodyB.label === 'enemy_body') {
            bullets = this.bulletGroup?.getMatching('body', bodyA);
            enemies = this.enemyGroup?.getMatching('body', bodyB.parent);
          }
          if (bodyB.label === 'bullet' && bodyA.label === 'enemy_body') {
            bullets = this.bulletGroup?.getMatching('body', bodyB);
            enemies = this.enemyGroup?.getMatching('body', bodyA.parent);
          }

          if (bullets)
            bullets.map((bullet) => {
              this.bulletGroup?.destroyBullet(bullet);
            });

          if (enemies)
            enemies.map((enemy) => {
              this.enemyGroup?.reduceHP(enemy);
            });
        }
      )
      .on(
        'collisionstart',
        (
          _event: Phaser.Physics.Matter.Events.CollisionStartEvent,
          bodyA: MatterJS.BodyType,
          bodyB: MatterJS.BodyType
        ) => {
          let isAttacked = false;
          if (bodyA.label === 'enemy_body' && bodyB.label === 'blue_human_body') {
            isAttacked = true;
          } else if (bodyB.label === 'enemy_body' && bodyA.label === 'blue_human_body') {
            isAttacked = true;
          }
          // 全体公開イベントを発火させ、playerのHPを減らす
          if (isAttacked) eventsCenter.emit('decrease-player-hp', 10);
        }
      );
  }

  update(time: number, delta: number): void {
    if (typeof this.player === 'undefined') return;
    this.player.update(delta);

    Phaser.Actions.IncX(this.enemyGroup!.getChildren(), -0.5);

    this.bulletGroup!.children.iterate((bullet) => {
      if (bullet instanceof Phaser.Physics.Matter.Sprite) {
        if (bullet.x <= 0 || bullet.y <= 0) {
          this.bulletGroup?.destroyBullet(bullet);
        }
        if (bullet.x > this.worldWidthEnd || bullet.y > this.worldHeightEnd) {
          this.bulletGroup?.destroyBullet(bullet);
        }
      }
    });

    this.enemyGroup?.children.iterate((enemy) => {
      if (enemy instanceof Phaser.Physics.Matter.Sprite) {
        if (enemy.x < 16) {
          this.enemyGroup?.despawn(enemy);
        }
      }
    });

    if (this.player.isMouseDown && time > this._lastFired) {
      this.fireBullet(this.player.x, this.player.y);
      this._lastFired = time + 80;
    }
  }

  private fireBullet(x: number, y: number) {
    if (typeof this.bulletGroup === 'undefined' || typeof this.player === 'undefined') {
      return null;
    }

    const bullet = this.bulletGroup.fire({ x, y }, this.player.mouse, 'bolt');

    return bullet;
  }
}
