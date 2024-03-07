/*
Names: Garrett Blake, James Milestone
Game Title: The Tale of Zelmore: The Golden Lake
Time Spent:
*/

// The base size from the Zelmore screenshot is 153 by 93, so the pixelart is made according to that
let config = {
    type: Phaser.AUTO,
    width: 153 * 5,
    height: 93 * 5,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    pixelArt: true,
    scene: [ Load, Title, Play, Credits, GameOver ]
}

let game = new Phaser.Game(config)
// Put any config that the other scenes may need
settings = {
    moveSpeed: 300,
    hurtStunTime: .25 * 1000,       // in milliseconds
    blockLength: .25 * 1000,        // in milliseconds
    blockCooldown: 1 * 1000,        // in milliseconds
    blockEndlag: .15 * 1000,        // in milliseconds
    attackWindUp: .1 * 1000,       // in milliseconds
    attackLength: .4 * 1000,        // in milliseconds
    attackEndlag: .15 * 1000,        // in milliseconds
    bossAttackWindUp: .3 * 1000,    // in milliseconds
    bossAttackLength: .3 * 1000,    // in milliseconds
    bossAttackEndlag: .2 * 1000,    // in milliseconds
}

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;