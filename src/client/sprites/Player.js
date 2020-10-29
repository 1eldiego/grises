import Phaser from 'phaser';

const WALK_SPEED = 70;
const RUN_MODIFIER = 1.6;
const DIAGONAL_SPEED = (WALK_SPEED * 2) - Math.sqrt(Math.pow(WALK_SPEED, 2) * 2);

class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, cursors, x = 600, y = 450) {
    super(scene, x, y, 'girl-idle');

    this.scene = scene;
    this.cursors = cursors;

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.depth = 2;
    this.body.setSize(180, 160); // tamaño del hitbox
    this.body.setOffset(120, 300); // posicion del hitbox
    this.setDisplaySize(64, 70); // tamaño del sprite (hitbox se escala)

    // shadow
    const shadowEllipse = new Phaser.Geom.Ellipse(0, 32, 37, 10);
    this.shadow = this.scene.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.1 } });
    this.shadow.fillEllipseShape(shadowEllipse, 64);
    this.shadow.depth = 1;

    // animations
    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('girl-idle'),
      frameRate: 30,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'walk',
      frames: this.scene.anims.generateFrameNumbers('girl-walk'),
      frameRate: 30,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNumbers('girl-run'),
      frameRate: 30,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'jump',
      frames: this.scene.anims.generateFrameNumbers('girl-jump'),
      frameRate: 30,
      repeat: -1,
    });
  }

  update() {
    // handle movements left right
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-1 * WALK_SPEED);
      this.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(WALK_SPEED);
      this.setFlipX(false);
    } else {
      this.body.setVelocityX(0);
    }

    // handle movements up down
    if (this.cursors.up.isDown) {
      this.body.setVelocityY(-1 * WALK_SPEED);
    } else if (this.cursors.down.isDown) {
      this.body.setVelocityY(WALK_SPEED);
    } else {
      this.body.setVelocityY(0);
    }

    // normalize diagonal velocity
    if (this.body.velocity.x !== 0 && this.body.velocity.y !== 0) {
      this.body.setVelocityX(Math.sign(this.body.velocity.x) * DIAGONAL_SPEED);
      this.body.setVelocityY(Math.sign(this.body.velocity.y) * DIAGONAL_SPEED);
    }

    // run with shift
    if (this.cursors.shift.isDown) {
      this.body.setVelocityX(this.body.velocity.x * RUN_MODIFIER);
      this.body.setVelocityY(this.body.velocity.y * RUN_MODIFIER);
    }

    // animations by velocity
    if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
      if (this.cursors.shift.isDown) {
        this.anims.play('run', true);
      } else {
        this.anims.play('walk', true);
      }
    } else {
      this.anims.play('idle', true);
    }

    // shadow follows player
    this.shadow.setPosition(
      this.x + ((this.flipX ? -1 : 1) * 3),
      this.y
    );
  }
}

export default Player;
