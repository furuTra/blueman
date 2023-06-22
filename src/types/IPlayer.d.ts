declare interface IPlayer {
  body: IBody;
  mouse: TPos;
  get isMouseDown(): boolean;
  create(): void;
  update(dt: number): void;
}
