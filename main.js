const canvas = document.getElementById("ballcanvas");
let ctx = canvas.getContext("2d");

let xhalf = canvas.width / 2;
let yhalf = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballR = 10;
let padHeight = 10;
let padWidth = 75;
let padX = (canvas.width - padWidth) / 2;
let rightPressed = false;
let leftPressed = false;

const brickCC = 6;
const brickRC = 5;
const brickW = 65;
const brickH = 15;
const brickP = 10;
const brickTop = 20;
const brickLeft = 20;
const bricks = [];

let score = 0;
let lives = 3;

//배열 안에 배열을 만들어 주는 것이 2차원 배열 
for (let c = 0; c < brickCC; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRC; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
            //status가 1일때는 보이고 0일때는 안보이도록 추가
        };
    }
}

document.addEventListener("keydown", keydownF);
document.addEventListener("keyup", keyupF);

function keydownF(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyupF(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function collisionD() {
    for (let c = 0; c < brickCC; c++) {
        for (let r = 0; r < brickRC; r++) {
            let b = bricks[c][r];
            if (b.status == 1) { //벽돌이 살아있을때 부딪혔는지 확인
                if (xhalf > b.x && xhalf < b.x + brickW && yhalf > b.y && yhalf < b.y + brickH) {
                    dy = -dy;
                    b.status = 0; //부딪혔는지 확인하고 부딪히면 0으로 변경
                    score++;
                    if (score == brickCC * brickRC) {
                        alert("YOU WIN CONGRATULATION!");
                        window.location.reload(true);
                    }
                }
            }
        }
    }
}

function ball() {
    ctx.beginPath();
    ctx.arc(xhalf, yhalf, ballR, 0, 360 * Math.PI / 180, false);
    ctx.fillStyle = "#555";
    ctx.fill();
    ctx.closePath;
};


function pad() {
    ctx.beginPath();
    ctx.rect(padX, canvas.height - padHeight, padWidth, padHeight);
    ctx.fillStyle = "#aaa";
    ctx.fill();
    ctx.closePath;
}

function drawBricks() {
    for (let c = 0; c < brickCC; c++) {
        for (var r = 0; r < brickRC; r++) {
            if (bricks[c][r].status == 1) {
                /*status가 1일때만 벽돌을 그려준다*/
                let brickX = (c * (brickW + brickP)) + brickLeft;
                let brickY = (r * (brickH + brickP)) + brickTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickW, brickH);
                ctx.fillStyle = "#ccc"
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#555";
    ctx.fillText("Score: " + score, 8, 20); //8, 20은 위치 
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#555";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20); //8, 20은 위치 
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    ball();
    pad();
    collisionD();
    drawScore();
    drawLives();

    xhalf = xhalf + dx;
    yhalf = yhalf + dy;
    /* xhalf & yhalf의 위치는 처음에 위에서 정의한 위치였지만 여기에 dx와 dy를 더해서 값을 계속 변경해줌. 그래서 그 변경되는 값들을 기준으로 코드를 짜는 것(하기의 if정도 그런것) */

    if (yhalf + dy < ballR) {
        dy = -dy;
    } else if (yhalf + dy > canvas.height - ballR) {
        if (xhalf > padX && xhalf < padX + padWidth) {
            dy = -dy;
        } else {
            lives--;
            if (!lives) {
                alert("Game Over");
                document.location.reload();
            } else {
                xhalf = canvas.width / 2;
                yhalf = canvas.height - 30;
                dx = 3;
                dy = -3;
                padX = (canvas.width-padWidth)/2;
            }

        }
    }
    if (xhalf + dx < ballR || xhalf + dx > canvas.width - ballR) {
        dx = -dx;
    }

    if (rightPressed && padX < canvas.width - padWidth) {
        padX = padX + 7;
    }
    if (leftPressed && padX > 0) {
        padX = padX - 7;
    }

};

setInterval(draw, 10);
