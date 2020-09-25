import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    resolution: 0.55,
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
    powerPreference: 'high-performance',
  },
  backgroundColor: '000000',
  scene: [
    GameScene,
  ]
};

new Phaser.Game(config);
