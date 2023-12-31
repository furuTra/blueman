import Phaser from "phaser";
import Property from "~/models/Property";
import SceneController from "./SceneController";

import OKButtonTsx from "~/tsx/OKButton";
import InputNameTsx from "~/tsx/InputName";

import Title from "~/utils/Title";

export default class StartScene extends Phaser.Scene {
  static readonly sceneKey = 'start_scene';

  private _property?: Property;

  private _title?: Title;

  constructor() {
    super({ key: StartScene.sceneKey });
    this._property = new Property();
  }

  init() {
    this.registry.set('player', this._property);
  }

  create() {
    this._title = new Title(this, 400, 150, 'Blue Man');
    this._title.create();

    const inputElement = this.add.dom(400, 300, InputNameTsx() as HTMLElement);
    const okButtonElement = this.add.dom(400, 400, OKButtonTsx() as HTMLElement);
    okButtonElement.addListener("pointerover").on("pointerover", () => {
      (okButtonElement.node as HTMLInputElement).style.backgroundColor = "#e0ff44";
      (okButtonElement.node as HTMLInputElement).style.transition = "background-color 0.5s ease";
    });
    okButtonElement.addListener("pointerout").on("pointerout", () => {
      (okButtonElement.node as HTMLInputElement).style.backgroundColor = "#e0ffff";
    });
    okButtonElement.addListener("click").on("click", (_event: Event) => {
      const input = inputElement.getChildByName("name") as HTMLInputElement;
      if (input && input.value !== '') {
        inputElement.removeListener('click').setVisible(false);
        this.updateName(input.value);
        this.moveScene();
      }
    });
  }

  update() {
    if (!this._title) return;
    this._title.update();
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