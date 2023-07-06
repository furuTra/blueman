import Rocket from './Rocket';
import Bolt from './Bolt';
import { IBulletBody } from './interfaces';
import { TBulletKey } from './types';

const getBulletLists = (scene: Phaser.Scene, x: number, y: number, label?: string) => {
  const bulletLists = new Map<TBulletKey, () => IBulletBody>();
  bulletLists.set('rocket', () => new Rocket(scene, x, y, label));
  bulletLists.set('bolt', () => new Bolt(scene, x, y, label));
  return bulletLists;
};

export default getBulletLists;
