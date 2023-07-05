import Phaser from 'phaser';
import { ICharacter } from './interfaces';
import Droid from './Droid';
import Blue from './Blue';

export type TBodyType = 'droid' | 'blue';

const getBodyLists = (scene: Phaser.Scene, x: number, y: number) => {
  const bodyLists = new Map<TBodyType, () => ICharacter>();
  bodyLists.set('droid', () => new Droid(scene, x, y));
  bodyLists.set('blue', () => new Blue(scene, x, y));
  return bodyLists;
};

export default getBodyLists;
