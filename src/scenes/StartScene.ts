import Phaser from "phaser";
import Property from "~/models/Property";
import SceneController from "./SceneController";

import buttonTsx from "../tsx/Button";
import InputTsx from "../tsx/Input";

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
    const inputElement = this.add.dom(400, 300, InputTsx() as HTMLElement);
    inputElement.addListener('click');
    inputElement.on("click", (event: Event) => {
      const targetDom = event.target as HTMLElement;
      if (targetDom.getAttribute("name") === 'nameButton') {
        const input = inputElement.getChildByName('name') as HTMLInputElement;
        if (input && input.value !== '') {
          inputElement.removeListener('click');
          inputElement.setVisible(false);
          this.updateName(input.value);
          this.moveScene();
        }
      }
    });

    this.add.dom(400, 500, buttonTsx() as HTMLElement);
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