class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, keybinds, config) {
        super(scene, x, y, texture, frame)

        // Spawn the player
        this.sprite = scene.add.existing(this)
        this.physics = scene.physics.add.existing(this)
        
        this.setOrigin(0.5, 1)
        this.body.setGravity(0, 100)

        // https://www.youtube.com/watch?v=SCO2BbbO17c i left off at timestamp 
        // adding player attack hitbox
        this.attackHitbox = scene.add.rectangle(0,0,60, 12, 0xFFFFFF, 0).setOrigin(0,0)
        this.attackHitbox.setPosition(w*3, h*3)
        scene.physics.add.existing(this.attackHitbox)
        
        // Set up properties
        this.colliding = false
        this.isBlocking = false
        this.blockOnCooldown = false
        //scene.physics.add.overlap(this.sword)


        this.keybinds = keybinds
        this.player = config.player         // 1 or 2
        this.character = config.character   // 'knight' or 'boss'
        this.direction = config.direction   // 'right' or 'left'
        
        this.PlayerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            attack: new AttackState(),
            hurt: new HurtState(),
            block: new BlockState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM
    }

    update() {
        this.PlayerFSM.step()
    }
}


// hero-specific state classes
class IdleState extends State {
    enter(scene, hero) {
        hero.body.setVelocity(0)
        hero.anims.play(`idle-${hero.character}-${hero.direction}`)
    }

    execute(scene, hero) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, block, attack } = hero.keybinds
        const HKey = scene.keys.HKey

        // to prevent player from doing anything during the scene transition
        if (!scene.playing) { return }

        // transition to attack when pressing the associated button
        if(Phaser.Input.Keyboard.JustDown(attack)) {
            this.stateMachine.transition('attack')
            return
        }

        // hurt if H key input (just for demo purposes)
        if(Phaser.Input.Keyboard.JustDown(HKey) || hero.colliding == true) {
            this.stateMachine.transition('hurt')
            return
        }

        // transition to block if pressing block button
        if(Phaser.Input.Keyboard.JustDown(block) && !hero.blockOnCooldown) {
            this.stateMachine.transition('block')
            return
        }

        // transition to move if pressing a movement key
        if(left.isDown || right.isDown ) {
            this.stateMachine.transition('move')
            return
        }
    }
}

class MoveState extends State {
    execute(scene, hero) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, block, attack } = hero.keybinds
        const HKey = scene.keys.HKey

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(attack)) {
            this.stateMachine.transition('attack')
            return
        }

        // transition to block if pressing block button
        if(Phaser.Input.Keyboard.JustDown(block) && !hero.blockOnCooldown) {
            this.stateMachine.transition('block')
            return
        }

        // hurt if H key input (just for demo purposes)
        if(Phaser.Input.Keyboard.JustDown(HKey) || hero.colliding == true) {
            this.stateMachine.transition('hurt')
            return
        }

        // transition to idle if not pressing movement keys
        if(!(left.isDown || right.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        // handle movement
        let moveDirection = new Phaser.Math.Vector2(0, 0)
        if(left.isDown) {
            moveDirection.x = -1
        } else if(right.isDown) {
            moveDirection.x = 1
        }
        // normalize movement vector, update hero position, and play proper animation
        hero.body.setVelocity(settings.moveSpeed * moveDirection.x, settings.moveSpeed * moveDirection.y)
        hero.anims.play(`walk-${hero.character}-${hero.direction}`, true)
    }
}

class AttackState extends State {
    enter(scene, hero) {
        /*
        This works in 3 parts, as a sequence
        attack wind up goes
        attack comes out, plays its animation and activates the hitbox
        endlag plays and then sends player to idle state
        */

        hero.body.setVelocity(0)
        hero.anims.play(`attackWindUp-${hero.character}-${hero.direction}`)
        hero.once('animationcomplete', () => {
            hero.anims.play(`attack-${hero.character}-${hero.direction}`)
            // TODO: Turn on the hitbox for the weapon
            hero.attackHitbox.x = hero.x
            hero.attackHitbox.y = hero.y- 45
            if (hero.colliding){
                hero.attackHitbox.y +=  500
                
                this.stateMachine.transition('hurt')
                return
            }


            hero.once('animationcomplete', () => {
                hero.anims.play(`attackLag-${hero.character}-${hero.direction}`)
                // TODO: Turn off the hitbox for the weapon
                // HITBOX WILL ALSO NEED TO TURN OFF THE FIRST TIME A HIT IS REGISTERED
                hero.attackHitbox.y += 1000
                hero.once('animationcomplete', () => {
                    this.stateMachine.transition('idle')
                })
            })
        })
    }
}

class BlockState extends State {
    enter(scene, hero) {
        hero.anims.play(`block-${hero.character}-${hero.direction}`)
        hero.isBlocking = true

        hero.body.setVelocity(0)
        // hero.setTint(0x00AA00)     // turn green

        // set a short cooldown delay before going back to idle
        scene.time.delayedCall(settings.blockLength, () => {
            hero.clearTint()
            hero.isBlocking = false
            hero.anims.play(`blockLag-${hero.character}-${hero.direction}`)

            // set the block on cooldown, and let it be used once that cooldown is over
            hero.blockOnCooldown = true
            scene.time.delayedCall(settings.blockCooldown, () => {
                hero.blockOnCooldown = false
            })

            // Add some endlag at the end, and then go back to idle
            scene.time.delayedCall(settings.blockEndlag, () => {
                this.stateMachine.transition('idle')
            })
        })
    }
}

class HurtState extends State {
    enter(scene, hero) {
        scene.decreaseHearts()
        hero.colliding = false
        hero.isBlocking = true
        hero.body.setVelocity(0)
        hero.anims.play(`hurt-${hero.character}-${hero.direction}`)
        // hero.setTint(0xFF0000)     // turn red

        // create knockback by sending body in direction opposite facing direction
        switch(hero.direction) {
            case 'left':
                hero.body.setVelocityX(settings.moveSpeed*2)
                break
            case 'right':
                hero.body.setVelocityX(-settings.moveSpeed*2)
                break
        }

        // set recovery timer
        scene.time.delayedCall(settings.hurtStunTime, () => {
            hero.clearTint()
            hero.isBlocking = false
            this.stateMachine.transition('idle')
        })
    }
}