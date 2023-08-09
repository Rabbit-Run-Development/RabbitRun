const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;

kaboom({
    
});

scene("game", () => {
    
    setGravity(3000)

    const player = add([
        rect(80, 80),
        pos(75, 500),
        area(),
        body(),
        color(255, 182, 193),
        move(RIGHT, 150),
    ]);
    
    const enemy = add([
        rect(100, 80),
        pos(-170, 500),
        area(),
        body(),
        color(255, 109, 10),
        move(RIGHT, 107)])
        
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
            rect(40, rand(32, 50)),
            area(),
            outline(4),
            pos(width(), height() - FLOOR_HEIGHT),
            anchor("botleft"),
            color(255, 180, 255),
            move(LEFT, SPEED),
            "rock",
        ]);
        
        wait(rand(0.5, 1.5), spawnRock);
        
        }
        
        spawnRock()
});

go("game")