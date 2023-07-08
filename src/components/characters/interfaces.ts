import { TAnim, TBodyKey } from './types';

export interface ICharacter {
  readonly bodyKey: TBodyKey;
  readonly bodyType: MatterJS.BodyType;
  readonly hpValue: number;
  set animPrefix(animPrefix: TAnim);
  get animPrefix(): TAnim;
  get animKey(): string;
  set isFlip(isFlip: boolean);
  get isFlip(): boolean;
}
