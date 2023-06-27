import BlueImage from '@assets/blue/blue.png';
import BlueAtlas from '@assets/blue/blue_atlas.json';
import BlueAnim from '@assets/blue/blue_anim.json';

export default class BlueHuman extends Phaser.Physics.Matter.Sprite implements IBody {
  private _animPrefix: TAnim;

  readonly animKeyPrefix = 'blue';

  get animKey(): string {
    return `${this.animKeyPrefix}_${this.animPrefix}`;
  }

  set animPrefix(animPrefix: TAnim) {
    this._animPrefix = animPrefix;
  }

  get animPrefix(): TAnim {
    return this._animPrefix;
  }

  private _isFlip = true;

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
      label: 'blue_human',
    };
    super(scene.matter.world, x, y, 'blue', '', Object.assign(defaults, config));

    const matter = new Phaser.Physics.Matter.MatterPhysics(scene);
    const body = matter.bodies.rectangle(x, y + 20, 32, 32, {
      ignoreGravity: true,
      restitution: 1,
      friction: 0,
      label: 'blue_human_body',
    });
    const sensor = matter.bodies.circle(x, y, 32, {
      isSensor: true,
      label: 'blue_human_sensor',
    });
    const boxBody = matter.body.create({
      parts: [body, sensor],
    });
    this.setExistingBody(boxBody);
    this._animPrefix = 'idle';
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('blue', BlueImage, BlueAtlas);
    scene.load.animation('blue', BlueAnim);
  }

  update(): void {
    this.anims.play({ key: this.animKey }, true);
    this.setFlipX(this.isFlip);
  }
}
