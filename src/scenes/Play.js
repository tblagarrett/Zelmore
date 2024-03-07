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
        this.boss.body.setSize(267, 390) // .setOffset(15, 0)

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

        // add colliders for floor
        this.physics.add.collider(this.knight, this.floor)
        this.physics.add.collider(this.boss, this.floor)

        //add hit box overlaps
        this.physics.add.overlap(this.boss, this.knight.attackHitbox, takeDamage, checkIfValid, this.boss)
        this.physics.add.overlap(this.knight, this.boss.attackHitbox, takeDamage, checkIfValid, this.knight)

        this.maxHealth = 8
        this.health = 4
        this.hearts = [ this.add.sprite(30, 50, 'heart').setOrigin(.5, 1), this.add.sprite(80, 50, 'heart').setOrigin(.5, 1), this.add.sprite(130, 50, 'emptyHeart').setOrigin(.5, 1), this.add.sprite(180, 50, 'emptyHeart').setOrigin(.5, 1)]
    }

    update(time, delta) {
        this.knight.update()
        this.boss.update()
    }

    decreaseHearts(){ // This manages the hearts and makes sure they are correctly updated. And if checks for wins
        this.health--
        
        if (this.health == 0){
            this.hearts[0].setTexture('emptyHeart')
            
            // Maybe add some fade and turn off player input

        }else if ( this.health%2 == 0){
            this.hearts[Math.ceil(this.health/2) -1 ].setTexture('heart')
            this.hearts[Math.ceil(this.health/2)  ].setTexture('emptyHeart')
        } else {
            this.hearts[Math.ceil(this.health/2) -1 ].setTexture('halfHeart')
        }
    }

    increaseHearts(){ // This manages the hearts and makes sure they are correctly updated. And if checks for wins
        this.health++
        console.log(this.health)
        if (this.health == 8){
            this.hearts[3].setTexture('heart')

            // Maybe add some fade and turn off player input
            
        }else if ( this.health%2 == 0){
            this.hearts[Math.ceil(this.health/2) -1 ].setTexture('heart')
            this.hearts[Math.ceil(this.health/2)  ].setTexture('emptyHeart')
        } else {
            this.hearts[Math.ceil(this.health/2) -1 ].setTexture('halfHeart')
        }
    }
}

function takeDamage() {
    this.colliding = true
}

function checkIfValid(recipient, hitbox) {
    hitbox.x += 500
    return recipient.PlayerFSM.state != 'hurt' && recipient.PlayerFSM.state != 'block'
}