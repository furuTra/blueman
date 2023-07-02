export default class Property {
  get hp(): number {
    return this._hp;
  }

  set hp(hp: number) {
    this._hp = hp;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get maxHp(): number {
    return this._maxHp;
  }

  set maxHp(maxHp: number) {
    this._maxHp = maxHp;
  }

  get pos(): { x: number; y: number } {
    return this._pos;
  }

  set pos({ x, y }) {
    this._pos = { x, y };
  }

  constructor(
    private _name = 'player1',
    private _hp = 100,
    private _maxHp = 100,
    private _pos = { x: 400, y: 300 }
  ) {}
}
