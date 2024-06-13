let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    width: 2200,
    height: 960,
    scene: [Load, StartMenu, Game, DriftTrack, Credits]
}

var cursors;
const SCALE = 1.0;
var my = {sprite: {}};

const game = new Phaser.Game(config);