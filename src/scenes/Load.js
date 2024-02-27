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
        this.load.image('knight', 'img/knight.png') // TODO: THIS WILL BE A SPRITESHEET

        // load sound assets

        // load spritesheets
    }

    create() {
        // animation configuration

        // go to Title scene
        this.scene.start('titleScene');
    }
}