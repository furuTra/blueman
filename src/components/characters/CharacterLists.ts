import Phaser from 'phaser';
import { ICharacter } from './interfaces';
import Droid from './Droid';
import Blue from './Blue';
import { TBodyKey } from './types';

const getCharacterLists = (scene: Phaser.Scene, x: number, y: number, label?: string) => {
  const characterLists = new Map<TBodyKey, () => ICharacter>();
  characterLists.set('droid', () => new Droid(scene, x, y, label));
  characterLists.set('blue', () => new Blue(scene, x, y, label));
  return characterLists;
};

export default getCharacterLists;
