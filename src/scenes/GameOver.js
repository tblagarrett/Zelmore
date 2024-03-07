class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create(data) {
        if (data.winner == 'boss') {
            this.add.image(0, 0, 'bossWin').setOrigin(0,0).setScale(5/2)
        } else if (data.winner == 'knight') {
            this.add.image(0, 0, 'knightWin').setOrigin(0,0)
        }

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }

    update() {
        if (this.space.isDown) {
            this.scene.start('titleScene')
        }
        if (this.r.isDown) {
            this.scene.start('playScene')
        }
    }
}