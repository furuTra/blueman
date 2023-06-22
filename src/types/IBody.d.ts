declare interface IBody extends Phaser.Physics.Matter.Sprite {
  set animPrefix(animPrefix: TAnim): void;
  get animPrefix(): TAnim;
  get animKey(): string;
  set isFlip(isFlip: boolean): void;
  get isFlip(): boolean;
}

declare type TAnim = 'idle' | 'move' | 'attack';
// 'idle' | 'move' | 'shoot' | 'reload' | 'talk' | 'death'
// 'idle' | 'move' | 'attack' | 'hurt' | 'countdown' | 'death'
