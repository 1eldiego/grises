import Phaser from 'phaser';
import girlIdle from '../assets/sprites/girl/idle.png';
import girlWalk from '../assets/sprites/girl/walk.png';
import girlRun from '../assets/sprites/girl/run.png';
import ground from '../assets/tileset/terrain_atlas.png';
import map from '../assets/tileset/grises.json';
import Player from '../sprites/Player';

class GameScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }

  preload() {
    this.load.spritesheet('girl-idle', girlIdle, { frameWidth: 416, frameHeight: 454 });
    this.load.spritesheet('girl-walk', girlWalk, { frameWidth: 416, frameHeight: 454 });
    this.load.spritesheet('girl-run', girlRun, { frameWidth: 416, frameHeight: 454 });
    this.load.image('ground', ground);
    this.load.tilemapTiledJSON('map', map);
  }

  create() {
    // keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // tilemap
    const map = this.make.tilemap({ key: 'map', width: 100, height: 100 });
    const tiles = map.addTilesetImage('grises_terrain', 'ground');
    const collisionLayer = map.createStaticLayer('Collision', tiles, 0, 0);
    collisionLayer.setCollisionByExclusion([-1]);
    collisionLayer.setVisible(false);
    map.createStaticLayer('Terreno Base', tiles, 0, 0);

    // player
    this.player = new Player(this, this.cursors);

    // collisions
    this.physics.add.collider(this.player, collisionLayer);

    // cameras
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, false, 0.2, 0.2);
    this.cameras.main.fadeIn(1000);
    this.cameras.main.setViewport(
      0,
      0,
      this.scale.canvasBounds.width * this.scale.displayScale.x,
      this.scale.canvasBounds.height * this.scale.displayScale.y
    );
  }

  update() {
    this.player.update();
  }
}

export default GameScene;
