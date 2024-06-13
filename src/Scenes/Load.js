class Load extends Phaser.Scene {
    constructor() {
        super("load");
    }
    
    preload()
    {
        this.load.setPath("./assets/");

        this.load.image("track_tiles", "spritesheet_tiles.png");
        this.load.tilemapTiledJSON("tutorial_track", "tutorialTrack.tmj");
        this.load.tilemapTiledJSON("track1", "level1Track.tmj");
        this.load.tilemapTiledJSON("track2", "level2Track.tmj");
        this.load.tilemapTiledJSON("track3", "level3Track.tmj");

        this.load.image("yellowCar", "car_yellow_1.png");

        this.load.spritesheet("SpeedBoosts", "spritesheet_tiles.png", {
            frameWidth: 128,
            frameHeight: 128
        });
        
        this.load.audio("countdown", "raceStart.mp3");
        this.load.audio("engine", "car-engine-idle-sonic-bat-1-00-21.mp3");
        this.load.audio("boost", "speedBoost.mp3");
        this.load.audio("bgm", "groovy-ambient-funk-201745.mp3");
        this.load.audio("lap", "system-notification-199277.mp3");
        this.load.audio("yay", "yay2-86405.mp3");
    }

    create() {
        // ...and pass to the next Scene
        // this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.scene.start("StartMenu");
   }
}