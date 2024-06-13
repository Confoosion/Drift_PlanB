class DriftTrack extends Phaser.Scene {
    constructor() {
        super("DriftTrack");

        this.velocity = 0;
        this.checkpointsHit = 0;
        this.TOTAL_LAPS = 3;
        this.lap = 1;
        this.finished = false;
        this.started = false;
        this.startTimer = 0;
    }

    init() {
        this.TILESIZE = 128;
        this.SCALE = 1.0;
        this.TILEWIDTH = 40;
        this.TILEHEIGHT = 30;
        this.TILEHEIGHTOFFSET = -96;
    }

    create()
    {
        this.velocity = 0;
        this.checkpointsHit = 0;
        this.TOTAL_LAPS = 3;
        this.lap = 1;
        this.finished = false;
        this.started = false;
        this.startTimer = 0;

        this.bgm = this.sound.add("bgm", {
            loop: true,
            rate: 1,
            volume: 0.3
        });
        this.engine = this.sound.add("engine", {
            loop: true,
            rate: 1.25
        });
        let mapID = Math.floor(Math.random() * 3);
        if(mapID == 0)
        {
            this.map = this.add.tilemap("track1", this.TILESIZE, this.TILESIZE, this.TILEHEIGHT, this.TILEWIDTH);
        }
        else if(mapID == 1)
        {
            this.map = this.add.tilemap("track2", this.TILESIZE, this.TILESIZE, this.TILEHEIGHT, this.TILEWIDTH);
        }
        else
        {
            this.map = this.add.tilemap("track3", this.TILESIZE, this.TILESIZE, this.TILEHEIGHT, this.TILEWIDTH);
        }

        this.tileset = this.map.addTilesetImage("trackTileset", "track_tiles");
        this.wall = this.map.addTilesetImage("wallTileset", "track_tiles");

        this.backgroundLayer = this.map.createLayer("backgroundLayer", this.wall, 0, 0);

        this.checkpoints = this.map.createFromObjects("Checkpoints", {
            name: "checkpoint",
            key: "Checkpoints",
        });
        this.physics.world.enable(this.checkpoints, Phaser.Physics.Arcade.STATIC_BODY);
        this.checkpointGroup = this.add.group(this.checkpoints);

        this.finishLine = this.map.createFromObjects("Checkpoints", {
            name: "lap_checkpoint",
            key: "Checkpoints",
        });
        this.physics.world.enable(this.finishLine, Phaser.Physics.Arcade.STATIC_BODY);

        this.trackLayer = this.map.createLayer("trackLayer", this.tileset, 0, this.TILEHEIGHTOFFSET);

        if(mapID == 0)
        {
            this.speedBoosts = this.map.createFromObjects("SpeedBoosts", {
                name: "speedBooster",
                key: "SpeedBoosts",
                frame: 252
            });
        }
        else if(mapID == 1)
        {
            this.speedBoosts = this.map.createFromObjects("SpeedBoosts", {
                name: "speedBooster",
                key: "SpeedBoosts",
                frame: 6
            });
        }
        else
        {
            this.speedBoosts = this.map.createFromObjects("SpeedBoosts", {
                name: "speedBooster",
                key: "SpeedBoosts",
                frame: 138
            });
        }

        this.physics.world.enable(this.speedBoosts, Phaser.Physics.Arcade.STATIC_BODY);
        this.speedBoostGroup = this.add.group(this.speedBoosts);

        this.wallLayer = this.map.createLayer("wallLayer", this.wall, 0, 0);
        this.wallLayer.setCollisionByProperty({
            collides: true
        });

        if(mapID == 0)
        {
            my.sprite.player = this.physics.add.sprite(223, 490, "yellowCar").setScale(0.75);
        }
        else if(mapID == 1)
        {
            my.sprite.player = this.physics.add.sprite(1498, 1311, "yellowCar").setScale(0.75);
            my.sprite.player.rotation = 1.57;
        }
        else
        {
            my.sprite.player = this.physics.add.sprite(1735, 1663, "yellowCar").setScale(0.75);
            my.sprite.player.rotation = 4.71;
        }

        const radius = my.sprite.player.height * 0.25;
        my.sprite.player.body.setCircle(radius, 4, radius);

        this.lapText = this.add.text(-1050, -450, "Lap 1/3", { fontSize: '64px', fill: '#EE0', stroke: "#000", strokeThickness: 8 });
        this.lapText.setScrollFactor(0);

        this.raceTimeText = this.add.text(-1050, -380, "Time:0.00 ", { fontSize: '64px', fill: '#EE0', stroke: "#000", strokeThickness: 8 });
        this.raceTimeText.setScrollFactor(0);

        this.countdownTimer = this.add.text(200, 100, "3", { fontSize: '100px', fill: '#EE0', stroke: "#000", strokeThickness: 8 });
        this.countdownTimer.setScrollFactor(0).setOrigin(0.5);

        this.physics.add.collider(my.sprite.player, this.wallLayer);

        this.physics.add.overlap(my.sprite.player, this.checkpointGroup, (obj1, obj2) => {
            if(!obj2.hit)
            {
                obj2.hit = true;
                this.checkpointsHit += 1;
                console.log("Checkpoint " + this.checkpointsHit + " hit");
            }
        });
        this.physics.add.overlap(my.sprite.player, this.finishLine, (obj1, obj2) => {
            if(this.checkpointsHit == 10)
            {
                if(this.lap == 3)
                {
                    this.finished = true;
                    this.checkpointsHit = 0;
                    this.bgm.stop();
                    this.engine.stop();
                    this.sound.play("yay");
                }
                else
                {
                    this.checkpointsHit = 0;
                    this.lap++;
                    this.lapText.setText("Lap " + this.lap + "/3");
                    this.checkpointGroup.getChildren().forEach(function(check) {
                        check.hit = false;
                    }, this);
                    this.sound.play("lap");
                }
            }
        });

        this.physics.add.overlap(my.sprite.player, this.speedBoostGroup, (obj1, obj2) => {
            this.sound.play("boost", {
                volume: 0.05
            });
            if(this.velocity <= 750)
            {
                this.velocity += 35;
                console.log(this.velocity);
            }
        });

        cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, 0, this.map.heightInPixels + 300);
        this.cameras.main.startFollow(my.sprite.player, true);
        this.cameras.main.setZoom(0.5);
        this.engine.play();
    }

    update(time)
    {
        if(!this.started)
        {
            if(this.startTimer == 0)
                this.sound.play("countdown");
            this.startTimer++;

            if(this.startTimer >= 190)
            {
                this.countdownTimer.visible = false;
                this.started = true;
                // this.sound.play("bgm", {
                //     loop: true,
                //     rate: 1,
                //     volume: 0.3
                // });
                this.bgm.play();
            }
            else if(this.startTimer >= 132)
            {
                this.countdownTimer.setText("1").setFontSize(300);
            }
            else if(this.startTimer >= 68)
            {
                this.countdownTimer.setText("2").setFontSize(200);
            }
        }
        if(cursors.up.isDown && this.velocity <= 400 && !this.finished && this.started)
        {
            this.velocity+=7;
        }
        else
        {
            if (this.velocity >= 7)
            {
                this.velocity -= 7;
            }
        }
        if(cursors.left.isDown)
        {
            my.sprite.player.body.angularVelocity = -5*(this.velocity/10);
        }
        else if(cursors.right.isDown)
        {
            my.sprite.player.body.angularVelocity = 5*(this.velocity/10);
        }
        else
        {
            my.sprite.player.body.angularVelocity = 0;
        } 

        if(!this.finished && this.started)
        {
            var runTime = time * 0.001;
            this.raceTimeText.setText("Time:" + runTime.toFixed(2));
        }
        else if(this.finished)
        {
            const returnText = this.add.text(400, 300, 'Return to Main Menu', {
                fontSize: '100px',
                fill: '#ffffff',
                fontFamily: 'fantasy'
            }).setOrigin(0.5).setScrollFactor(0);
            returnText.setInteractive();
            returnText.on('pointerdown', () => {
                this.scene.start('StartMenu');
            });
        }

        my.sprite.player.body.velocity.x = this.velocity * Math.cos((my.sprite.player.angle-90)*0.01745);
        my.sprite.player.body.velocity.y = this.velocity * Math.sin((my.sprite.player.angle-90)*0.01745);
    }
}