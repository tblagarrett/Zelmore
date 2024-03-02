class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        this.sky = this.add.tileSprite(w/2, 0, 1000, 150, 'menuBG1').setOrigin(0.5, 0)
        this.backMountains = this.add.tileSprite(w/2, 210, 1000, 150, 'menuBG2').setOrigin(0.5, 1)
        this.frontMountains = this.add.tileSprite(w/2, h-195, 1000, 150, 'menuBG3').setOrigin(0.5, 1)
        this.mountainTexture = this.add.tileSprite(w/2, h-190, 1000, 150, 'menuBG4').setOrigin(0.5, 1)
        this.farHills = this.add.tileSprite(w/2, h-160, 1000, 150, 'menuBG5').setOrigin(0.5, 1)
        this.closeHills = this.add.tileSprite(w/2, h-130, 1000, 150, 'menuBG6').setOrigin(0.5, 1)
        this.grass = this.add.tileSprite(w/2, h-100, 1000, 150, 'menuBG7').setOrigin(0.5, 1)
        this.water = this.add.tileSprite(w/2, h, 1000, 150, 'menuBG8').setOrigin(0.5, .75)

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

        this.scrollFactor = .2

        this.sky.tilePositionX -= this.scrollFactor
        this.backMountains.tilePositionX -= this.scrollFactor * 1.5
        this.frontMountains.tilePositionX -= this.scrollFactor * 1.7
        this.mountainTexture.tilePositionX -= this.scrollFactor * 2
        this.farHills.tilePositionX -= this.scrollFactor * 2.2
        this.closeHills.tilePositionX -= this.scrollFactor * 2.5
        this.grass.tilePositionX -= this.scrollFactor * 2.7
    }
}