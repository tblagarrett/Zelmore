class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        // add background objects
        this.floor = this.physics.add.sprite(-centerX, h, 'floor').setOrigin(0,1).setImmovable(true)
        this.wall = this.add.sprite(-centerX, h-this.floor.height, 'plantwall').setOrigin(0,1)

        // add players
        this.knight = new Player(this, centerX, h/2, 'knight', 0, {
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        })

        // add colliders for floor
        this.physics.add.collider(this.knight, this.floor)
    }

    update(time, delta) {
    }
}
