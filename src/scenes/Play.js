class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        // TO BE DELETED
        this.keys = {
            HKey: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        }

        // add background objects
        this.sky = this.add.sprite(w/2, h-130, 'gameSky').setOrigin(.5, 1)
        this.tree1 = this.add.sprite(w/10, h-130, 'tree').setOrigin(0.5, 1)
        this.tree2 = this.add.sprite(w + w/4, h-130, 'tree').setOrigin(0.5, 1)
        this.floor = this.physics.add.sprite(-centerX, h, 'floor').setOrigin(0,1).setImmovable(true)
        this.wall = this.add.sprite(-centerX, h-this.floor.height, 'plantwall').setOrigin(0,1)

        // add players
        this.knight = new Player(this, w/4, h-this.floor.height, 'knight', 0, {
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
            block: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            attack: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        },{
            player: 1,
            character: 'knight',
            direction: 'right'
        })
        this.knight.body.setSize(65, 105).setOffset(15, 0)
        

        this.boss = new Boss(this, (w/4)*3, h-this.floor.height, 'boss', 0, {
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL),
            block: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            attack: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        }, {
            player: 2,
            character: 'boss',
            direction: 'left'
        })
        this.boss.body.setSize(180, 390) // .setOffset(15, 0)

        // add colliders for floor
        this.physics.add.collider(this.knight, this.floor)
        this.physics.add.collider(this.boss, this.floor)
    }

    update(time, delta) {
        this.knight.update()
        this.boss.update()
    }
}
