const FLOOR_HEIGHT = 152.5;
const JUMP_FORCE = 800;
const SPEED = 300;

kaboom({
   // background-color([0,0,0]),
});



loadSprite("background", "./garden2.jpg")
loadSprite("user", "./rabbitrun.png")
loadSprite("player", "./foxrun.png")
loadSprite("fox","./purplesky.jpg")
loadSprite("bunny","./bunnygame.png")
loadSprite("bunny","./enemy.png")

//scene("Rabbit intro",() => {
   // constbackgroundImage = add([
     //   sprite("background"),
        // width(100%)
       // ])
//});
// go("Rabbit intro")
scene("start", () => {
  const backgroundImage = add([
    sprite("background"),
    ]);
    // const waterBalloon = add([
    // sprite("water"), // sprite() component makes it render as a sprite
    // pos(width()/2, height() / 2),
    // anchor("center"),
    // scale(1.5),
    // ]);
//   loadFont("speed", "./fonts/SpeedRush-JRKVB.ttf")
  const titleText = add([
    text("Rabbit   Run!!!", {
        // font: "speed", // Replace with the actual font you loaded
        size: 68, // Adjust the size as needed
        color: rgb(0, 1, 0.6), // Text color (white in this case)
    }),
    pos(width() / 2, height() / 3), // Adjust the position as needed
    anchor("center"),
    scale(1),
]);
  const enter = add([
    text("press enter to Play", {
        // font: "speed",
        size: 68,
        color: rgb(0, 1, 0.6),
    }),
    pos(width() / 2, height() / 2),
    anchor("center"),
    scale(0.8),
    ]);
   onKeyPress("enter", () => {
     go("game");
   });
const user = add([
    sprite("user"),
    scale(0.5),
    pos(900,450)
    ]);
    
    const player = add([
        sprite("player"),
        scale(0.8),
        pos(300,300),
        ]);
});
go("start")

scene("game", () => {
     // constbackgroundImage = add([
        //sprite("backgroun"),
        // width(100%)
        // ])
    setGravity(2700)
    
    scene2  = add([
        sprite("fox"),
        scale(1.8),
        pos(0,-1090),
        ]);
    
    const goal = add([
        rect(60, 60),
        pos(width() / 1.1, 500),
        area(),
        body(),
        fixed()
        ])

    const player = add([
       
       rect(65, 65),
        pos(75, 500),
        area(),
        body(),
        color(255, 182, 193),
        move(RIGHT, 60),
    ]);

    const enemy = add([
  
         rect(130, 60),
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
        color(0,0,0),
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
            rect(37, rand(35, 35)),
            area(),
            outline(4),
            pos(width(), height() - FLOOR_HEIGHT),
            anchor("botleft"),
            color(255, 180, 255),
            move(LEFT, SPEED),
            "rock",
        ]);

        wait(rand(1, 1.5), spawnRock);

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

//go("game")
