import Phaser from 'phaser';
import { ICharacter } from './interfaces';
import Droid from './Droid';
import Blue from './Blue';
import { TBodyKey } from './types';
import { GreenSoldier, GreenWarrior } from './green';

const getCharacterLists = (scene: Phaser.Scene, x: number, y: number, label?: string) => {
  const characterLists = new Map<TBodyKey, () => ICharacter>();
  characterLists.set('droid', () => Droid.getBody(scene, x, y, label));
  characterLists.set('blue', () => Blue.getBody(scene, x, y, label));
  characterLists.set('green_soldier', () => GreenSoldier.getBody(scene, x, y, label));
  characterLists.set('green_warrior', () => GreenWarrior.getBody(scene, x, y, label));
  return characterLists;
};

export default getCharacterLists;
