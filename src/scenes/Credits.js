class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    create() {
        this.add.text(w/2, h - 30, 'Press any key to return').setScale(2).setOrigin(0.5, 0.5)

        this.add.text(40, h/2 - 100, `Created by: Garrett Blake and James Milestone
        \nVisuals made in aseprite`).setOrigin(0,0)
        this.add.text(40, h/2 , `Teaching: Proffessor Altice`).setOrigin(0,0)
    
        this.input.keyboard.on('keydown', () => {
            this.scene.start('titleScene')
        })
    }

    update(time, delta) {

    }
}