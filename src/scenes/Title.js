class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        // The background for the title screen! They all move seperately
        this.sky = this.add.tileSprite(w/2, 0, 765, 125, 'menuBG2').setOrigin(0.5, 0)
        this.clouds = this.add.tileSprite(w/2, 0, 765, 125, 'menuBG1').setOrigin(0.5, 0)
        this.backMountains = this.add.tileSprite(w/2, h-305, 765, 125, 'menuBG3').setOrigin(0.5, 1)
        this.frontMountains = this.add.tileSprite(w/2, h-270, 765, 125, 'menuBG4').setOrigin(0.5, 1)
        this.mountainTexture = this.add.tileSprite(w/2, h-260, 765, 125, 'menuBG5').setOrigin(0.5, 1)
        this.farHills = this.add.tileSprite(w/2, h-205, 765, 125, 'menuBG6').setOrigin(0.5, 1)
        this.closeHills = this.add.tileSprite(w/2, h-190, 765, 125, 'menuBG7').setOrigin(0.5, 1)
        this.grass = this.add.tileSprite(w/2, h-180, 765, 125, 'menuBG8').setOrigin(0.5, 1)
        this.water = this.add.tileSprite(w/2, h, 765, 125, 'water').setOrigin(0.5, 1)
        this.water2 = this.add.tileSprite(w/2, h-this.water.height/2, 765, 125, 'water').setOrigin(0.5, 1)

        // The reflection of the background on the gold bar
        this.reflection = this.add.tileSprite(w/2, h-65, 765, 125, 'reflection').setOrigin(0.5, 1).setAlpha(.2).setTint(0xbe9b3e)
        this.reflection.flipY = true

        // The title image
        this.title = this.add.image(w/2, h, 'titleText').setOrigin(0.5, 1).setScale(1)
        
        // Title Screen text
        this.add.text (w/2, h/2 + 200, 'Press space to play').setScale(2).setOrigin(0.5, 0.5)
        this.add.text (w/2, h/2 + 250, 'Press shift for credits').setScale(2).setOrigin(0.5, 0.5)
    
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update(time, delta) {
        if (this.cursors.space.isDown) {
            this.scene.start('playScene')
        }
        if (this.cursors.shift.isDown) {
            this.scene.start('creditsScene')
        }

        this.scrollFactor = .17

        this.clouds.tilePositionX -= this.scrollFactor
        this.backMountains.tilePositionX -= this.scrollFactor * 1.5
        this.frontMountains.tilePositionX -= this.scrollFactor * 1.7
        this.mountainTexture.tilePositionX -= this.scrollFactor * 2
        this.farHills.tilePositionX -= this.scrollFactor * 2.2
        this.closeHills.tilePositionX -= this.scrollFactor * 2.5
        this.grass.tilePositionX -= this.scrollFactor * 2.5

        this.reflection.tilePositionX -= this.scrollFactor * 2.5
    }
}