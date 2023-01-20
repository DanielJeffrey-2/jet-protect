namespace SpriteKind {
    export const object = SpriteKind.create()
    export const fireball = SpriteKind.create()
}
// Gives a harder opportunity for the players, by lowering the movement speed of the player's ship. 
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(Shooter, 50, 50)
})
// Provides a pop up menu to tell the player what to do, and the main objective of the game.
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    game.splash("Welcome to Jet-Protect." + " A game where you can protect the Earth with your super cool Jetpack skills," + " but be sure not to get hit, since 3 hits will knock you out!" + "Good luck!")
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    bogey.destroy(effects.disintegrate, 500)
    info.changeLifeBy(-1)
})
// When your ship overlaps with enemy projectiles (fireballs), the projectile will be destroyed and you will lose a life.
sprites.onOverlap(SpriteKind.Player, SpriteKind.fireball, function (sprite, otherSprite) {
    otherSprite.destroy(effects.spray, 500)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
// When the player's projectile overlaps with an enemy ship, the score will increase by 1 and the enemy will be destroyed
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 200)
    info.changeScoreBy(1)
})
// On contact with enemy ships, you will lose a life, and your enemy will be destroyed.
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
// Created: Jan 18, 2023
// Created by: Daniel Jeffrey
// This program is a "space shooter", where you have to destroy the enemy sprites before hitting you or reaching the bottom.
let projectile: Sprite = null
let projectile2: Sprite = null
let bogey: Sprite = null
let Shooter: Sprite = null
tiles.setCurrentTilemap(tilemap`level2`)
music.playMelody("C5 G B A F A C5 B ", 1200)
Shooter = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . f f f . . f f f . . . . 
    . 5 . 5 f f f . . f f f 5 . 5 . 
    . 5 . 5 . . f . . f . . 5 . 5 . 
    . . . . . . f . . f . . . . . . 
    . b . b . . f . . f . . b . b . 
    . b . b . . b b b b . . b . b . 
    . b b b . . b b b b . . b b b . 
    . . b b . . b b b b . . b b . . 
    . . b b b b b b b b b b b b . . 
    . . . b b b b b b b b b b . . . 
    . . . . b b b b b b b b . . . . 
    . . . . . . d d 2 2 . . . . . . 
    . . . . . . d d d d . . . . . . 
    . . . . . . d 8 d 8 . . . . . . 
    . . . . . . e e e e . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(Shooter, 200, 200)
Shooter.setStayInScreen(true)
info.setLife(3)
let Power_Up = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . 7 7 7 7 7 7 7 . . . . . 
    . . 7 7 1 1 1 1 1 1 1 7 7 . . . 
    . 7 1 1 1 1 1 1 1 1 1 1 1 7 . . 
    . 7 1 1 1 1 1 7 1 1 1 1 1 7 . . 
    7 1 1 1 1 1 7 7 7 1 1 1 1 1 7 . 
    7 1 1 1 1 7 7 7 7 7 1 1 1 1 7 . 
    7 1 1 1 1 1 1 7 1 1 1 1 1 1 7 . 
    7 1 1 1 1 1 1 7 1 1 1 1 1 1 7 . 
    7 1 1 1 1 1 1 7 1 1 1 1 1 1 7 . 
    7 1 1 1 1 1 1 7 1 1 1 1 1 1 7 . 
    7 1 1 1 1 1 1 1 1 1 1 1 1 1 7 . 
    . 7 1 1 1 1 1 1 1 1 1 1 1 7 . . 
    . 7 1 1 1 1 1 1 1 1 1 1 1 7 . . 
    . . 7 7 1 1 1 1 1 1 1 7 7 . . . 
    . . . . 7 7 7 7 7 7 7 . . . . . 
    `, SpriteKind.object)
// Simple back and forth animation.
animation.runImageAnimation(
Shooter,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . f f f . . f f f . . . . 
    . 5 . 5 f f f . . f f f 5 . 5 . 
    . 5 . 5 . . f . . f . . 5 . 5 . 
    . . . . . . f . . f . . . . . . 
    . b . b . . f . . f . . b . b . 
    . b . b . . b b b b . . b . b . 
    . b b b . . b b b b . . b b b . 
    . . b b . . b b b b . . b b . . 
    . . b b b b b b b b b b b b . . 
    . . . b b b b b b b b b b . . . 
    . . . . b b b b b b b b . . . . 
    . . . . . . d d 2 2 . . . . . . 
    . . . . . . d d d d . . . . . . 
    . . . . . . d 8 d 8 . . . . . . 
    . . . . . . e e e e . . . . . . 
    `,img`
    . . . . f f f . . f f f . . . . 
    . 5 . 5 f f f . . f f f 5 . 5 . 
    . 5 . 5 . . f . . f . . 5 . 5 . 
    . . . . . . f . . f . . . . . . 
    . b . b . . f . . f . . b . b . 
    . b . b . . b b b b . . b . b . 
    . b b b . . b b b b . . b b b . 
    . . b b . . b b b b . . b b . . 
    . . b b b b b b b b b b b b . . 
    . . . b b b b b b b b b b . . . 
    . . . . b b b b b b b b . . . . 
    . . . . . . 2 2 d d . . . . . . 
    . . . . . . d d d d . . . . . . 
    . . . . . . 8 d 8 d . . . . . . 
    . . . . . . e e e e . . . . . . 
    . . . . . . . . . . . . . . . . 
    `],
100,
true
)
// Once the score reaches 20, enemy projectiles will start to spawn, and will track onto your sprite.
forever(function () {
    music.playMelody("C5 G B A F A C5 B ", 375)
    while (info.score() > 20) {
        projectile2 = sprites.create(img`
            . . . . 2 4 5 5 5 5 5 4 2 . . . 
            . . . . 2 4 5 5 5 5 5 4 4 2 . . 
            . . . 2 4 4 5 5 5 5 5 5 4 2 2 . 
            . . 2 2 4 5 5 5 5 5 4 4 4 4 2 . 
            . . 2 4 4 5 5 5 5 4 4 4 5 4 2 . 
            . 2 4 4 5 5 5 5 5 4 2 4 4 5 2 2 
            . 2 4 5 5 4 4 5 5 4 2 2 4 4 4 2 
            2 4 4 5 4 4 4 4 5 4 2 2 4 4 2 . 
            2 4 5 5 4 2 2 4 5 4 2 2 4 4 2 . 
            2 4 4 4 2 . 2 4 4 5 2 2 4 4 2 . 
            . 2 4 2 2 . . 2 4 2 . 2 4 4 2 . 
            . 2 2 2 . . . 2 4 2 . . 4 4 2 . 
            . . 2 . . . . 2 2 . . . 2 2 . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . 2 . . . . . . . 
            . . . . . . . . 2 . . . . . . . 
            `, SpriteKind.fireball)
        projectile2.setPosition(randint(10, 150), 10)
        projectile2.follow(Shooter, 30)
        pause(5000)
    }
})
// Gives the player's ship the ability to autoshoot.
game.onUpdateInterval(150, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . 5 . . . . . 5 . . . . . . 
        . . . 5 . . 5 . . 5 . . . . . . 
        . . . 5 . . 5 . . 5 . . . . . . 
        . . . 5 . . 5 . . 5 . . . . . . 
        . . . 5 . . 5 . . 5 . . . . . . 
        . . . 5 . . 5 . . 5 . . . . . . 
        . . . 5 . . 5 . . 5 . . . . . . 
        . . . 5 . . 5 . . 5 . . . . . . 
        . . . 5 . . 5 . . 5 . . . . . . 
        . . . 5 . . 5 . . 5 . . . . . . 
        . . . 5 . . 5 . . 5 . . . . . . 
        . . . 5 . . . . . 5 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Shooter, 0, -100)
})
// Spawns enemy ships anywhere at the top of the screen.
game.onUpdateInterval(500, function () {
    bogey = sprites.create(assets.image`bogey`, SpriteKind.Enemy)
    bogey.setVelocity(0, 50)
    bogey.setPosition(randint(5, 115), 0)
    bogey.setFlag(SpriteFlag.AutoDestroy, false)
})
