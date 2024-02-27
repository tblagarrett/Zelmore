class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        // add background objects
        this.floor = this.physics.add.sprite(-centerX, h, 'floor').setOrigin(0,1).setImmovable(true)
        this.wall = this.add.sprite(-centerX, h-this.floor.height, 'plantwall').setOrigin(0,1)

        // add players
        this.knight = new Player(this, centerX, h/2, 'knight', 0, {})

        // add colliders for floor
        this.physics.add.collider(this.knight, this.floor)
    }

    update(time, delta) {
    }
}
