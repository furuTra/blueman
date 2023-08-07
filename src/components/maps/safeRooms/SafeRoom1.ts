import Phaser from 'phaser';
import mapJson from '@assets/maps/safeRoom1/map.json';
import MapBase from '~/components/maps/MapBase';

export default class SafeRoom1 extends MapBase {
  static readonly mapKey = 'safe_room_1';

  constructor(scene: Phaser.Scene) {
    super(scene, SafeRoom1.mapKey, mapJson);
  }

  static preload(scene: Phaser.Scene) {
    MapBase.preload(scene);
    scene.load.tilemapTiledJSON(SafeRoom1.mapKey, mapJson);
  }
}
