import Phaser from 'phaser';
import { ICharacter } from './interfaces';
import Droid from './Droid';
import Blue from './Blue';
import { TBodyKey } from './types';

const getBodyLists = (scene: Phaser.Scene, x: number, y: number) => {
  const bodyLists = new Map<TBodyKey, () => ICharacter>();
  bodyLists.set('droid', () => new Droid(scene, x, y));
  bodyLists.set('blue', () => new Blue(scene, x, y));
  return bodyLists;
};

export default getBodyLists;
