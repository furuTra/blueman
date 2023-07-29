import Phaser from 'phaser';
import mapJson from '@assets/maps/map1/map.json';
import MapBase from '~/components/maps/MapBase';

export default class Map1 extends MapBase {
  static readonly mapKey = 'map_1';

  constructor(scene: Phaser.Scene) {
    super(scene, Map1.mapKey, mapJson)
  }

  static preload(scene: Phaser.Scene) {
    MapBase.preload(scene);
    scene.load.tilemapTiledJSON(Map1.mapKey, mapJson);
  }
}
