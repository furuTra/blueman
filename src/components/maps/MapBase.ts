import Phaser from 'phaser';
import { TLayer, TTileMap } from './types';
import mapTile from '@assets/maps/map1/map.png';

export default abstract class MapBase {
  protected _scene: Phaser.Scene;

  protected _map: Phaser.Tilemaps.Tilemap;

  protected _tileset: Phaser.Tilemaps.Tileset | null;

  protected _mapJson: TTileMap;

  constructor(scene: Phaser.Scene, mapKey: string, mapJson: TTileMap) {
    this._scene = scene;
    this._map = this._scene.make.tilemap({
      key: mapKey,
    });
    this._tileset = this._map.addTilesetImage('map');
    this._mapJson = mapJson;
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image('map', mapTile);
  }

  create() {
    this._mapJson.layers.forEach((layer: TLayer) => {
      if (!this._tileset) return;
      if (layer.type === 'tilelayer') {
        const mapLayer = this._map.createLayer(layer.name, this._tileset);
        if (!mapLayer) return;
        mapLayer.setCollisionByProperty({
          collides: true,
        });
        this._scene.matter.world.convertTilemapLayer(mapLayer);
      }
    });
  }
}
