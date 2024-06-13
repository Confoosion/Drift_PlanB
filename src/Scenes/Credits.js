class Credits extends Phaser.Scene {
    constructor() {
        super("Credits");
        this.my = {background: {}};
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("credits", "credits.png");
    }

    create()
    {
        let my = this.my;
        my.background = this.add.image(600,500, "credits");

        // single-player
        const backToMenuText = this.add.text(640, 450, 'Main Menu', {
            fontSize: '40px',
            fill: '#ffffff',
            fontFamily: 'fantasy'
        }).setOrigin(0.5);
        backToMenuText.setInteractive();
        backToMenuText.on('pointerdown', () => {
            this.scene.start('StartMenu');
        });

        // single-player
        const jakeText = this.add.text(500, 175, 'main mechanics (implemention of unique player movement)', {
            fontSize: '30px',
            fill: 'lightgrey',
            fontFamily: 'fantasy'
        }).setOrigin(0.5);

        // single-player
        const calText = this.add.text(610, 270, 'game logic (implementation of game)', {
            fontSize: '30px',
            fill: 'lightgrey',
            fontFamily: 'fantasy'
        }).setOrigin(0.5);

        // single-player
        const andreaText = this.add.text(650, 370, 'visual assets, credit + menu scene, intro mechanics', {
            fontSize: '30px',
            fill: 'lightgrey',
            fontFamily: 'fantasy'
        }).setOrigin(0.5);

    }
}