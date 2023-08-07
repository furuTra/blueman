import Phaser from 'phaser';
import Bolt from '~/components/bullets/Bolt';
import BulletPool from '~/components/bullets/BulletPool';
import Blue from '~/components/characters/Blue';
import Player from '~/components/Player';
import EnemyPool from '~/components/enemies/EnemyPool';
import Droid from '~/components/characters/Droid';
import Map1 from '~/components/maps/Map1';
import { IPlayer } from '~/components/interfaces';
import eventsCenter from '~/events/EventsCenter';
import Rocket from '~/components/bullets/Rocket';
import { GreenSoldier, GreenWarrior } from '~/components/characters/green';
import { TBodyKey } from '~/components/characters/types';
import { IBullet } from '~/components/bullets/interfaces';
import { IEnemy } from '~/components/enemies/interfaces';

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
    Rocket.preload(this);
    Blue.preload(this);
    Droid.preload(this);
    Map1.preload(this);
    GreenWarrior.preload(this);
    GreenSoldier.preload(this);
  }

  init() {
    this.cameras.main.fadeIn(100);
    const fxCamera = this.cameras.main.postFX.addPixelate(400);
    this.add.tween({
      targets: fxCamera,
      duration: 1700,
      amount: -1,
    });
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
    this.worldHeightEnd = 1440;
    this.worldWidthEnd = 1920;

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
        // :FIXME: このままでは、最初に出現する敵のソートで固定されてしまう。
        const characters: TBodyKey[] = ['green_warrior', 'green_soldier', 'droid'];
        const randomIndex = Math.floor(Math.random() * characters.length);
        this.enemyGroup?.spawn({ x: posX, y: posY }, characters[randomIndex]);
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
          let bullets: IBullet[] | undefined;
          let enemies: IEnemy[] | undefined;
          if (bodyA.label === 'bullet_sensor' && bodyB.label === 'enemy_body') {
            bullets = this.bulletGroup?.getMatching('body', bodyA.parent);
            enemies = this.enemyGroup?.getMatching('body', bodyB.parent);
          }
          if (bodyB.label === 'bullet_sensor' && bodyA.label === 'enemy_body') {
            bullets = this.bulletGroup?.getMatching('body', bodyB.parent);
            enemies = this.enemyGroup?.getMatching('body', bodyA.parent);
          }

          let actBullet: IBullet;
          if (bullets)
            bullets.map((bullet) => {
              actBullet = bullet;
              this.bulletGroup?.destroyBullet(bullet);
            });

          if (enemies)
            enemies.map((enemy) => {
              this.enemyGroup?.reduceHP(enemy, actBullet.attack);
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
          if (bodyA.label === 'enemy_body' && bodyB.label === 'player_body') {
            isAttacked = true;
          }
          if (bodyB.label === 'enemy_body' && bodyA.label === 'player_body') {
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

    this.bulletGroup!.children.iterate((bullet) => {
      if (bullet instanceof Phaser.Physics.Matter.Sprite) {
        if (bullet.x <= 0 || bullet.y <= 0) {
          this.bulletGroup?.destroyBullet(bullet);
        }
        if (bullet.x > this.worldWidthEnd || bullet.y > this.worldHeightEnd) {
          this.bulletGroup?.destroyBullet(bullet);
        }
      }
      return null;
    });

    this.enemyGroup?.children.iterate((enemy) => {
      if (enemy instanceof Phaser.Physics.Matter.Sprite) {
        // 追いかける機能を追加
        if (this.player) {
          (enemy as IEnemy).homing(this.player?.x, this.player?.y);
        }
        // 敵キャラの身体の幅によって、画面から消える範囲が異なる。
        if (enemy.x < enemy.width / 2) {
          this.enemyGroup?.despawn(enemy);
        }
      }
      return null;
    });

    if (this.player.isMouseDown && time > this._lastFired) {
      const bullet = this.fireBullet(this.player.x, this.player.y);
      this._lastFired = time + bullet!.intervalTime;
    }
  }

  private fireBullet(x: number, y: number) {
    if (typeof this.bulletGroup === 'undefined' || typeof this.player === 'undefined') {
      return null;
    }
    const bullet: IBullet = this.bulletGroup.fire({ x, y }, this.player.mouse, 'rocket');
    return bullet;
  }
}
