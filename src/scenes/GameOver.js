class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create(data) {
        if (data.winner == 'boss') {
            this.add.text(w/2, h/2, 'BOSS WIN')
        } else if (data.winner == 'knight') {
            this.add.text(w/2, h/2, 'KNIGHT WIN')
        }

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        this.add.text(w/2, h/2 + 150, 'Press space for Title').setScale(1).setOrigin(0.5, 0.5)
        this.add.text(w/2, h/2 + 200, 'Press r to run it back').setScale(2).setOrigin(0.5, 0.5)
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