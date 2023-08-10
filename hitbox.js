const FLOOR_HEIGHT = 152.5;
const JUMP_FORCE = 800;
const SPEED = 300;

kaboom({

});
loadSprite("rabbit2", "sprites/rabbit2.png")
loadSprite("rock", "sprites/rock.png")
loadSprite("fox", "sprites/fox.png")
scene("game", () => {

    setGravity(2700)
    
    const goal = add([
        rect(60, 60),
        pos(width() / 1.1, 500),
        area(),
        body(),
        fixed()
        ])

    const player = add([
        sprite("rabbit2"),
        pos(75, 500),
        area(),
        body(),
        color(255, 182, 193),
        move(RIGHT, 60),
        scale(.17)
    ]);

    const enemy = add([
        sprite("fox"),
        area(),
        body(),
        pos(-114, 500),
        color(255, 109, 10),
        move(RIGHT, 42)
    ])

    add([
        rect(width(), FLOOR_HEIGHT),
        outline(4),
        pos(0, height()),
        anchor("botleft"),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
    ]);

    function jump() {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
        }
    }

    onKeyPress("space", jump);
    onClick(jump);

    function spawnRock() {
        add([
            sprite("rock"),
            area(),
            outline(4),
            pos(width(), height() - FLOOR_HEIGHT),
            anchor("botleft"),
            color(255, 180, 255),
            move(LEFT, SPEED),
            "rock",
            scale(0.04)
        ]);

        wait(rand(.5, 1.5), spawnRock);

    }

    spawnRock()

    slowRabbit = () => {
        setTimeout(
            player.move(-SPEED + 127, 0)
       )
    }

    player.onCollideUpdate("rock", () => {
        slowRabbit();
        shake(3);

    })
    
    player.onCollide("enemy", () => {
        
    })

    let score = 0

    const scoreLabel = add([
        text(score),
        pos(24, 24)
    ]);

    onUpdate(() => {
        score++;
        scoreLabel.text = score;
    });

});

go("game")
