import Phaser from "phaser";
import Property from "~/models/Property";
import SceneController from "./SceneController";

import OKButtonTsx from "~/tsx/OKButton";
import InputNameTsx from "~/tsx/InputName";

export default class StartScene extends Phaser.Scene {
  static readonly sceneKey = 'start_scene';

  private _property?: Property;

  constructor() {
    super({ key: StartScene.sceneKey });
    this._property = new Property();
  }

  init() {
    this.registry.set('player', this._property);
  }

  create() {
    const inputElement = this.add.dom(400, 300, InputNameTsx() as HTMLElement);

    const okButtonElement = this.add.dom(400, 400, OKButtonTsx() as HTMLElement);

    okButtonElement.addListener("click").on("click", (_event: Event) => {
      const input = inputElement.getChildByName("name") as HTMLInputElement;
      if (input && input.value !== '') {
        inputElement.removeListener('click').setVisible(false);
        this.updateName(input.value);
        this.moveScene();
      }
    });
  }

  private updateName(name: string) {
    if (!this._property) return;
    this._property.name = name;
    this.registry.set('player', this._property);
  }

  private moveScene() {
    this.scene.start(SceneController.sceneKey);
    this.scene.stop(StartScene.sceneKey);
  }
}