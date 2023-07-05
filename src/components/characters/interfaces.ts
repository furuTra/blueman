import { TAnim, TBodyKey } from './types';

export interface ICharacter {
  readonly bodyKey: TBodyKey;
  readonly body: MatterJS.BodyType;
  set animPrefix(animPrefix: TAnim);
  get animPrefix(): TAnim;
  get animKey(): string;
  set isFlip(isFlip: boolean);
  get isFlip(): boolean;
}
