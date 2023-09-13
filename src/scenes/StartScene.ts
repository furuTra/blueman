import Phaser from "phaser";
import Property from "~/models/Property";
import SceneController from "./SceneController";

import buttonTsx from "../tsx/Button";

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

  preload() {
    this.load.html('nameform', '../assets/forms/nameform.html');
  }

  create() {
    const element = this.add.dom(400, 300).createFromCache('nameform');
    element.addListener('click');
    element.on(
      'click',
      (event: Phaser.Types.Input.EventData) => {
        if (event.target.name === 'nameButton') {
          const input = element.getChildByName('name');
          if (input && input.value !== '') {
            element.removeListener('click');
            element.setVisible(false);
            this.updateName(input.value);
            this.moveScene();
          }
        }
      });

    const but = this.add.dom(400, 500, buttonTsx() as HTMLElement);
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