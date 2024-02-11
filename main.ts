namespace SpriteKind {
    export const Life = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    info.changeLifeBy(-1)
    info.changeCountdownBy(2)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Monkey,
    assets.animation`MonkeyLeftVideo`,
    200,
    true
    )
})
info.onCountdownEnd(function () {
    if (info.score() >= WinScore) {
        game.gameOver(true)
        music.play(music.stringPlayable("C5 B A G F E D C ", 500), music.PlaybackMode.UntilDone)
    } else {
        game.gameOver(false)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Monkey,
    assets.animation`MonkeyRightVideo`,
    200,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Life, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.confetti, 500)
    music.play(music.createSoundEffect(WaveShape.Square, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    info.changeLifeBy(1)
})
info.onLifeZero(function () {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.bubbles, 50)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.confetti, 500)
    music.play(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-1)
})
let Banana: Sprite = null
let Heart: Sprite = null
let Hammer: Sprite = null
let WinScore = 0
let Monkey: Sprite = null
Monkey = sprites.create(assets.image`Monkey`, SpriteKind.Player)
Monkey.setStayInScreen(true)
scene.setBackgroundImage(assets.image`HalloweenBackground`)
controller.moveSprite(Monkey)
scroller.scrollBackgroundWithSpeed(-10, 0)
info.setScore(0)
info.setLife(3)
let Timer = 20
info.startCountdown(Timer)
WinScore = Timer / 1.6 * 0.9
Monkey.sayText("Collect" + ("" + WinScore + "to win !!!"), 2000, true)
forever(function () {
    Hammer = sprites.create(assets.image`Hammer`, SpriteKind.Enemy)
    Hammer.setPosition(randint(40, 160), 0)
    Hammer.setVelocity(randint(-10, -40), randint(50, 70))
    pause(1900)
})
forever(function () {
    Heart = sprites.create(assets.image`Heart`, SpriteKind.Life)
    Heart.setPosition(randint(40, 160), 0)
    Heart.setVelocity(randint(-10, -40), randint(50, 70))
    pause(10000)
})
forever(function () {
    Banana = sprites.create(assets.image`Banana`, SpriteKind.Food)
    Banana.setPosition(randint(60, 160), 0)
    Banana.setVelocity(randint(-5, -20), randint(30, 40))
    pause(1600)
})
forever(function () {
    if (info.countdown() <= 5) {
        music.play(music.melodyPlayable(music.siren), music.PlaybackMode.UntilDone)
    } else {
        music.stopAllSounds()
    }
})
forever(function () {
    if (info.score() >= WinScore) {
        game.gameOver(true)
        music.play(music.stringPlayable("C5 B A G F E D C ", 500), music.PlaybackMode.UntilDone)
    }
})
