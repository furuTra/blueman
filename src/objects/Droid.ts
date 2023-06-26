import HealthBar from '../libs/HealthBar';

export default class Droid extends Phaser.Physics.Matter.Sprite implements IBody {
  private _animPrefix: TAnim;

  readonly animKeyPrefix = 'droid';

  private _nameTag: Phaser.GameObjects.Text;

  removeName() {
    this._nameTag.setActive(false);
    this._nameTag.setVisible(false);
  }

  showName() {
    this._nameTag.setText(`droid${Math.floor(this.x)}`)
    this._nameTag.setActive(true);
    this._nameTag.setVisible(true);
  }

  private _health: IHealthBar;

  get health(): IHealthBar {
    return this._health;
  }

  get animKey(): string {
    return `${this.animKeyPrefix}_${this.animPrefix}`;
  }

  set animPrefix(animPrefix: TAnim) {
    this._animPrefix = animPrefix;
  }

  get animPrefix(): TAnim {
    return this._animPrefix;
  }

  private _isFlip = false;

  set isFlip(isFlip: boolean) {
    this._isFlip = isFlip;
  }

  get isFlip() {
    return this._isFlip;
  }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: Phaser.Types.Physics.Matter.MatterBodyConfig
  ) {
    const defaults: Phaser.Types.Physics.Matter.MatterBodyConfig = {
      label: 'droid',
    };
    super(scene.matter.world, x, y, 'droid', '', Object.assign(defaults, config));

    const matter = new Phaser.Physics.Matter.MatterPhysics(scene);
    const body = matter.bodies.rectangle(x, y + 20, 32, 20, {
      ignoreGravity: true,
      restitution: 1,
      friction: 0,
      label: 'droid_body',
    });
    const sensor = matter.bodies.circle(x, y, 32, {
      isSensor: true,
      label: 'droid_sensor',
    });
    const boxBody = matter.body.create({
      parts: [body, sensor],
      label: 'droid',
    });
    this.setExistingBody(boxBody);
    this._animPrefix = 'idle';
    this._nameTag = scene.add.text(x, y, `droid${Math.floor(this.x)}`, {
      font: '12px Arial',
      color: '#2f4f4f',
    });

    this._health = new HealthBar(scene, { x: -32, y: -32 });
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas(
      'droid',
      './src/assets/droid/droid.png',
      './src/assets/droid/droid_atlas.json'
    );
    scene.load.animation('droid', './src/assets/droid/droid_anim.json');
  }

  update(): void {
    this.anims.play({ key: this.animKey }, true);
    this.setFlipX(this.isFlip);
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this._nameTag.setPosition(this.x - 16, this.y - 16);
    this._health.setPosition({ x: this.x, y: this.y });
  }
}
