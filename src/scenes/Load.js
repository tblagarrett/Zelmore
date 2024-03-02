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

        // menu bg
        this.load.image('menuBG1', 'img/mainmenu/MainMenuBackground-1.png')
        this.load.image('menuBG2', 'img/mainmenu/MainMenuBackground-2.png')
        this.load.image('menuBG3', 'img/mainmenu/MainMenuBackground-3.png')
        this.load.image('menuBG4', 'img/mainmenu/MainMenuBackground-4.png')
        this.load.image('menuBG5', 'img/mainmenu/MainMenuBackground-5.png')
        this.load.image('menuBG6', 'img/mainmenu/MainMenuBackground-6.png')
        this.load.image('menuBG7', 'img/mainmenu/MainMenuBackground-7.png')
        this.load.image('menuBG8', 'img/mainmenu/MainMenuBackground-8.png')

        // load sound assets

        // load spritesheets
        this.load.spritesheet('knight', 'img/KnightSprite.png', {
            frameWidth: 105,
            frameHeight: 140
        }) 
    }

    create() {
        // animation configuration

        // knight animations
        this.anims.create({
            key: 'idle-knight-right',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 1 }),
        })

        this.anims.create({
            key: 'walk-knight-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 3 }),
        })


        // go to Title scene
        this.scene.start('titleScene');
    }
}