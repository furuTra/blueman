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
import { IMap } from '~/components/maps/interfaces';

export default class BattleScene extends Phaser.Scene {
  private _bulletGroup?: IBulletPool;

  private _enemyGroup?: IEnemyPool;

  private _player?: IPlayer;

  private _map?: IMap;

  private _lastFired = 0;

  private _worldWidthEnd = 0;

  private _worldHeightEnd = 0;

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
    this.initSceneAnim();
  }

  private initSceneAnim() {
    this.cameras.main.fadeIn(100);
    const fxCamera = this.cameras.main.postFX.addPixelate(400);
    this.add.tween({
      targets: fxCamera,
      duration: 1700,
      amount: -1,
    });
  }

  private createCamera() {
    if (this._player)
      this.cameras.main
        .startFollow(this._player, true)
        .setBounds(0, 0, this._worldWidthEnd, this._worldHeightEnd);

    return this.cameras.main;
  }

  create(): void {
    this._worldHeightEnd = 1440;
    this._worldWidthEnd = 1920;

    this._bulletGroup = this.add.bulletPool();
    this._enemyGroup = this.add.enemyPool();

    this._map = new Map1(this);
    this._map.create();

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        const posX = Phaser.Math.Between(this._worldWidthEnd - 64, this._worldWidthEnd);
        const posY = Phaser.Math.Between(64, this._worldHeightEnd - 64);
        // :FIXME: このままでは、最初に出現する敵のソートで固定されてしまう。
        const characters: TBodyKey[] = ['green_warrior', 'green_soldier', 'droid'];
        const randomIndex = Math.floor(Math.random() * characters.length);
        this._enemyGroup?.spawn({ x: posX, y: posY }, characters[randomIndex]);
      },
    });

    this._player = new Player(this, 'blue', 400, 300);
    this._player.create();

    this.createCamera();

    this.matter.world
      .setBounds(0, 0, this._worldWidthEnd, this._worldHeightEnd)
      .on(
        'collisionstart',
        (
          _event: Phaser.Physics.Matter.Events.CollisionStartEvent,
          bodyA: MatterJS.BodyType,
          bodyB: MatterJS.BodyType
        ) => {
          this.bulletCollision(bodyA, bodyB);
          this.enemyCollision(bodyA, bodyB);
        }
      );
  }

  private bulletCollision(bodyA: MatterJS.BodyType, bodyB: MatterJS.BodyType) {
    let bullets: IBullet[] | undefined;
    let enemies: IEnemy[] | undefined;
    if (bodyA.label === 'bullet_sensor' && bodyB.label === 'enemy_body') {
      bullets = this._bulletGroup?.getMatching('body', bodyA.parent);
      enemies = this._enemyGroup?.getMatching('body', bodyB.parent);
    }
    if (bodyB.label === 'bullet_sensor' && bodyA.label === 'enemy_body') {
      bullets = this._bulletGroup?.getMatching('body', bodyB.parent);
      enemies = this._enemyGroup?.getMatching('body', bodyA.parent);
    }

    let actBullet: IBullet;
    if (bullets)
      bullets.map((bullet) => {
        actBullet = bullet;
        this._bulletGroup?.destroyBullet(bullet);
      });

    if (enemies)
      enemies.map((enemy) => {
        this._enemyGroup?.reduceHP(enemy, actBullet.attack);
      });
  }

  private enemyCollision(bodyA: MatterJS.BodyType, bodyB: MatterJS.BodyType) {
    let isAttacked = false;
    let enemies: IEnemy[] | undefined;
    if (bodyA.label === 'enemy_body' && bodyB.label === 'player_body') {
      isAttacked = true;
      enemies = this._enemyGroup?.getMatching('body', bodyA.parent);
    }
    if (bodyB.label === 'enemy_body' && bodyA.label === 'player_body') {
      isAttacked = true;
      enemies = this._enemyGroup?.getMatching('body', bodyB.parent);
    }
    // 全体公開イベントを発火させ、playerのHPを減らす
    if (isAttacked && enemies) {
      enemies.map((enemy) => {
        eventsCenter.emit('decrease-player-hp', enemy.charactor.attack);
      });
    }
  }

  update(time: number, delta: number): void {
    if (typeof this._player === 'undefined') return;
    this._player.update(delta);

    this._bulletGroup!.children.iterate((bullet) => {
      if (bullet instanceof Phaser.Physics.Matter.Sprite) {
        if (bullet.x <= 0 || bullet.y <= 0) {
          this._bulletGroup?.destroyBullet(bullet);
        }
        if (bullet.x > this._worldWidthEnd || bullet.y > this._worldHeightEnd) {
          this._bulletGroup?.destroyBullet(bullet);
        }
      }
      return null;
    });

    this._enemyGroup?.children.iterate((enemy) => {
      if (enemy instanceof Phaser.Physics.Matter.Sprite) {
        // 追いかける機能を追加
        if (this._player) (enemy as IEnemy).homing(this._player?.x, this._player?.y);

        // 敵キャラの身体の幅によって、画面から消える範囲が異なる。
        if (enemy.x < enemy.width / 2) this._enemyGroup?.despawn(enemy);
      }
      return null;
    });

    if (this._player.isMouseDown && time > this._lastFired) {
      const bullet = this.fireBullet(this._player.x, this._player.y);
      this._lastFired = time + bullet!.intervalTime;
    }
  }

  private fireBullet(x: number, y: number) {
    if (typeof this._bulletGroup === 'undefined' || typeof this._player === 'undefined') {
      return null;
    }
    const bullet: IBullet = this._bulletGroup.fire({ x, y }, this._player.mouse, 'rocket');
    return bullet;
  }
}
