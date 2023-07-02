import Phaser from 'phaser';
import BattleScene from '~/scenes/BattleScene';
import UIScene from '~/scenes/UIScene';
import SceneController from '~/scenes/SceneController';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#dcdcdc',
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0 },
      debug: {
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
      },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [SceneController, BattleScene, UIScene],
};
export default new Phaser.Game(config);
