export type TLayer = {
  compression: string;
  data: string;
  encoding: string;
  height: number;
  id: number;
  name: string;
  opacity: number;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
};

export type TTileset = {
  columns: number;
  firstgid: number;
  image: string;
  imageheight: number;
  imagewidth: number;
  margin: number;
  name: string;
  spacing: number;
  tilecount: number;
  tileheight: number;
  tilewidth: number;
};

export type TTileMap = {
  compressionlevel: number;
  height: number;
  infinite: boolean;
  layers: TLayer[];
  nextlayerid: number;
  nextobjectid: number;
  orientation: string;
  renderorder: string;
  tiledversion: string;
  tileheight: number;
  tilesets: TTileset[];
  tilewidth: number;
  type: string;
  version: string;
  width: number;
}
