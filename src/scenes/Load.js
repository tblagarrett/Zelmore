// Class copied from professor Altice's PaddleParkourP3
class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';

        // load graphics assets
        this.load.image('floor', 'img/floor.png')
        this.load.image('plantwall', 'img/plantwall.png')
        this.load.image('gameSky', 'img/GameSky.png')
        this.load.image('tree', 'img/tree.png')

        // menu bg
        this.load.image('menuBG1', 'img/mainmenu/MainMenuBackground-1.png')
        this.load.image('menuBG2', 'img/mainmenu/MainMenuBackground-2.png')
        this.load.image('menuBG3', 'img/mainmenu/MainMenuBackground-3.png')
        this.load.image('menuBG4', 'img/mainmenu/MainMenuBackground-4.png')
        this.load.image('menuBG5', 'img/mainmenu/MainMenuBackground-5.png')
        this.load.image('menuBG6', 'img/mainmenu/MainMenuBackground-6.png')
        this.load.image('menuBG7', 'img/mainmenu/MainMenuBackground-7.png')
        this.load.image('menuBG8', 'img/mainmenu/MainMenuBackground-8.png')
        this.load.image('water', 'img/mainmenu/GoldBackground-1.png')
        this.load.image('reflection', 'img/mainmenu/MainMenuBackground-9.png')
        this.load.image('titleText', 'img/mainmenu/TitleScreenTitle-1.png')

        // load sound assets

        // load spritesheets
        this.load.spritesheet('knight', 'img/KnightSprite.png', {
            frameWidth: 120,
            frameHeight: 105
        }) 
    }

    create() {
        // animation configuration

        
        /*
        KNIGHT ANIMATIONS
        */

        // IDLE
        this.anims.create({
            key: 'idle-knight-right',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 1 }),
        })

        // WALK
        this.anims.create({
            key: 'walk-knight-right',
            frameRate: 16,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('knight', {
                frames: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            })
        })

        // BLOCK
        this.anims.create({
            key: 'block-knight-right',
            repeat: 0,
            frames: this.anims.generateFrameNumbers('knight', {
                frames: [13]
            }),
            duration: settings.blockLength
        })
        this.anims.create({
            key: 'blockLag-knight-right',
            repeat: 0,
            frames: this.anims.generateFrameNumbers('knight', {
                frames: [12]
            }),
            duration: settings.blockEndlag
        })

        // HURT
        this.anims.create({
            key: 'hurt-knight-right',
            repeat: 0,
            frames: this.anims.generateFrameNumbers('knight', {
                frames: [14]
            }),
            duration: settings.hurtStunTime
        })

       // ATTACK
       this.anims.create({
            key: 'attackWindUp-knight-right',
            repeat: 0,
            frames: this.anims.generateFrameNumbers('knight', {
                frames: [15, 16]
            }),
            duration: settings.attackWindUp
       })
       this.anims.create({
            key: 'attack-knight-right',
            repeat: 0,
            frames: this.anims.generateFrameNumbers('knight', {
                frames: [17]
            }),
            duration: settings.attackLength
       })
       this.anims.create({
            key: 'attackLag-knight-right',
            repeat: 0,
            frames: this.anims.generateFrameNumbers('knight', {
                frames: [16, 15]
            }),
            duration: settings.attackEndlag
       })

        // go to Title scene
        this.scene.start('titleScene');
    }
}