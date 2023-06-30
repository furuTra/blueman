import Phaser from 'phaser';
import mapTile from '@assets/maps/map1/map.png';
import mapJson from '@assets/maps/map1/map.json';

export default class Map1 {
  private scene: Phaser.Scene;

  private map?: Phaser.Tilemaps.Tilemap;

  private tileset?: Phaser.Tilemaps.Tileset;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image('tiles', mapTile);
    scene.load.tilemapTiledJSON('map', mapJson);
  }

  create() {
    this.map = this.scene.make.tilemap({
      key: 'map',
    });
    this.tileset = this.map.addTilesetImage('map', 'tiles', 96, 96, 0, 0);
    this.map.createLayer('base', this.tileset);
    this.map.createLayer('wall', this.tileset);
    this.map.createLayer('floor1', this.tileset);
    this.map.createLayer('floor2', this.tileset);
  }
}
