import Phaser from "phaser";

export default class Title extends Phaser.GameObjects.Text {
  private _hsv: Phaser.Types.Display.ColorObject[];

  private _i: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    style: Phaser.Types.GameObjects.Text.TextStyle = {}
  ) {
    const defalut: Phaser.Types.GameObjects.Text.TextStyle = {
      font: "74px Arial Black",
      color: "#fff"
    };
    super(scene, x, y, text, Object.assign(defalut, style));
    this._hsv = Phaser.Display.Color.HSVColorWheel();
    this._i = 0;
    scene.add.existing(this);
  }

  create() {
    this
      .setStroke('#00f', 16)
      .setShadow(2, 2, "#333333", 2, true, true)
      .setOrigin(0.5);
  }

  update() {
    const top = this._hsv[this._i].color;
    const bottom = this._hsv[359 - this._i].color;

    this.setTint(top, bottom, top, bottom);

    this._i++;

    if (this._i >= 360) this._i = 0;
  }
}