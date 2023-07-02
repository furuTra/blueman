import Phaser from 'phaser';
import Property from '~/libs/Property';

export default class SceneController extends Phaser.Scene {
  constructor() {
    super({ key: 'scene_controller' });
    this._property = new Property();
  }

  private _property: Property;

  init() {
    this.registry.set('player', this._property);
  }

  create() {
    this.scene.launch('ui_scene');
    this.scene.launch('battle_scene');
  }

  update() {
    // const data = this.registry.get('player');
    // console.log(data);
  }
}
