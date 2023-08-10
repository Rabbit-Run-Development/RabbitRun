const FLOOR_HEIGHT = 152.5;
const JUMP_FORCE = 800;
const SPEED = 300;

kaboom({

});
loadSprite("rabbit2", "sprites/rabbit2.png")
loadSprite("rock", "sprites/rock.png")
loadSprite("fox", "sprites/fox.png")
loadSprite("goal", "sprites/goal.png")

scene("game", () => {

    setGravity(2700)

    const goal = add([
        sprite("goal"),
        pos(width() / 1.1, 650),
        area(),
        body(),
        fixed(),
        scale(.15),
        "goal"
    ])

    const player = add([
        sprite("rabbit2"),
        pos(1500, 650),
        area(),
        body(),
        color(255, 182, 193),
        move(RIGHT, 60),
        scale(.17),
        "player"
    ]);

    const enemy = add([
        sprite("fox"),
        area(),
        body(),
        pos(-114, 650),
        color(255, 109, 10),
        move(RIGHT, 42),
        scale(.7),
        "enemy"
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
            scale(0.03)
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
        shake(2);

    })

    player.onCollide("enemy", () => {
        go("lose", score)
       
    })

    player.onCollide("goal", () => {
    go("win", score)
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

    })

    scene("lose", (score) => {

	add([
		sprite("fox"),
		pos(width() / 2, height() / 2 - 64),
		scale(2),
		anchor("center"),
	])

	
	add([
		text("Score:" + score),
		pos(850, 520),
		scale(2),
		anchor("center"),
	])
	
	add([
	    text("YOU GOT CAUGHT!"),
	    pos(656, 179),
	    scale(1.4),
	    ])

	
	onKeyPress("space", () => go("game"))
	onClick(() => go("game"))

    })

    scene("win", (score) => {

	add([
		sprite("rabbit2"),
		pos(width() / 2, height() / 2 - 64),
		scale(1),
		anchor("center"),
	])

	
	add([
		text("Score:" + score),
		pos(860, 550),
		anchor("center"),
	])
	
	add([
	    text("YOU ESCAPED!"),
	    pos(750, 150),
	    ])

	
	onKeyPress("space", () => go("game"))
	onClick(() => go("game"))

})

go("game")
