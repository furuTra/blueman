import Phaser from 'phaser';
import { TLayer, TTileMap } from './types';
import mapTile from '@assets/maps/map1/map.png';
import mapJson from '@assets/maps/map1/map.json';

export default class Map1 {
  private scene: Phaser.Scene;

  private map: Phaser.Tilemaps.Tilemap;

  private tileset: Phaser.Tilemaps.Tileset;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.map = this.scene.make.tilemap({
      key: 'map',
    });
    this.tileset = this.map.addTilesetImage('map', 'tiles', 96, 96, 0, 0);
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image('tiles', mapTile);
    console.log(mapJson);
    scene.load.tilemapTiledJSON('map', mapJson);
  }

  create() {
    (mapJson as TTileMap).layers.forEach((layer: TLayer) => {
      if (layer.type === 'tilelayer') {
        const mapLayer = this.map.createLayer(layer.name, this.tileset).setCollisionByProperty({
          collides: true,
        });
        this.scene.matter.world.convertTilemapLayer(mapLayer);
      }
    });
  }
}
