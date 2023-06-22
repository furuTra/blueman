import HPBar from '~/libs/HPBar';

export default class Enemy extends Phaser.Physics.Matter.Sprite implements IEnemy {
  private _nameTag: Phaser.GameObjects.Text;

  private _body: MatterJS.BodyType;

  private _health: IHPBar;

  private _tween: Phaser.Tweens.Tween;

  get health(): IHPBar {
    return this._health;
  }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture = 'droid',
    config: Phaser.Types.Physics.Matter.MatterBodyConfig
  ) {
    const defaults: Phaser.Types.Physics.Matter.MatterBodyConfig = {
      label: 'droid',
    };
    super(scene.matter.world, x, y, texture, '', Object.assign(defaults, config));

    const matter = new Phaser.Physics.Matter.MatterPhysics(scene);
    const body = matter.bodies.rectangle(x, y + 20, 32, 20, {
      ignoreGravity: true,
      restitution: 1,
      friction: 0,
      label: 'enemy_body',
    });
    const sensor = matter.bodies.circle(x, y, 32, {
      isSensor: true,
      label: 'enemy_sensor',
    });
    this._body = matter.body.create({
      parts: [body, sensor],
      label: 'enemy',
    });
    this.setExistingBody(this._body);

    this._nameTag = scene.add.text(x, y, `enemy_${Math.floor(this.x)}`, {
      font: '12px Arial',
      color: '#2f4f4f',
    });

    this._health = new HPBar(scene, { x: -32, y: -32 });

    this._tween = this.scene.tweens.create({
      targets: this,
      scale: 2,
      repeat: -1,
      yoyo: true,
    });

    this.startTween();
  }

  startTween() {
    this._tween.makeActive();
  }

  removeName() {
    this._nameTag.setActive(false);
    this._nameTag.setVisible(false);
  }

  showName() {
    this._nameTag.setText(`enemy${Math.floor(this.x)}`);
    this._nameTag.setActive(true);
    this._nameTag.setVisible(true);
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this._nameTag.setPosition(this.x - 16, this.y - 16);
    this._health.setPosition(this.x, this.y);
  }
}
