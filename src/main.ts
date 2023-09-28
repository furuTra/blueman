import Phaser from 'phaser';
import BattleScene from '~/scenes/BattleScene';
import SafeRoomScene from '~/scenes/SafeRoomScene';
import UIScene from '~/scenes/UIScene';
import SceneController from '~/scenes/SceneController';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import StartScene from './scenes/StartScene';

const debug = (import.meta.env.MODE === 'development') ? {
  showAxes: false,
  showAngleIndicator: true,
  showVelocity: true,
  velocityColor: 0x00aeef,
  angleColor: 0xe81144,
  showBody: true,
  showStaticBody: true,
  showSensors: true,
  sensorFillColor: 0x0d177b,
  sensorLineColor: 0x1327e4,
  anchorColor: 0xefefef,
  anchorSize: 4,
} : undefined;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#dcdcdc',
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0 },
      debug
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // Phaser内でHTMLが追加される親の要素
    parent: "phaser-example",
  },
  // Phaser内でHTMLタグを利用する。
  dom: {
    createContainer: true
  },
  scene: [
    StartScene,
    SceneController,
    BattleScene,
    SafeRoomScene,
    UIScene
  ],
  plugins: {
    global: [
      {
        plugin: VirtualJoystickPlugin,
        key: 'rexVirtualJoystick',
        start: true,
      },
    ],
  },
};
console.log(import.meta.env.MODE)
console.log(config)
export default new Phaser.Game(config);
