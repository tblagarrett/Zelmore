class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        // add background objects
        this.floor = this.physics.add.sprite(-centerX, h, 'floor').setOrigin(0,1).setImmovable(true)
        this.wall = this.add.sprite(-centerX, h-this.floor.height, 'plantwall').setOrigin(0,1)

        // add players
        this.smallPlayer = this.physics.add.sprite(centerX, h-this.floor.height, 'smallPlayer').setOrigin(0.5, 1).setGravity(0, 100)


        // add colliders for floor
        this.physics.add.collider(this.smallPlayer, this.floor)
    }

    update(time, delta) {
    }
}
