let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3'); //game function
let snakeArr = [
    { x: 13, y: 15 }
];
let speed = 10;
let lastPaintTime = 0;
let food = { x: 4, y: 3 }
let score = 0;


function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    scoreBox.innerHTML = "Score: " + score;
}

function isCollide(snake) {
    //if snake bumb into itself
    for (let index = 1; index < snakeArr.length; index++) {
        if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
            return true;
        }
    }
    //if you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    //Part 1: Updating the snake array
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over .Press any key to play a game");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
        document.getElementById('muted').classList.remove('fa-volume-high');
        document.getElementById('muted').classList.add('fa-volume-xmark');

    }
    // if snake has eaten the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "HighScore: " + highscoreval;

        }
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        }

    }
    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2: Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
// main logic starts here
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscoreval = 0;
    localStorage.setItem("hightscore", JSON.stringify(highscoreval));
} else {
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "HighScore: " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":

            inputDir.x = 0;
            inputDir.y = -1;

            break;
        case "ArrowDown":

            inputDir.x = 0;
            inputDir.y = 1;

            break;
        case "ArrowLeft":

            inputDir.x = -1;
            inputDir.y = 0;

            break;
        case "ArrowRight":

            inputDir.x = 1;
            inputDir.y = 0;

            break;


        default:
            break;
    }
});
document.getElementById('muted').addEventListener('click', () => {
    if (musicSound.paused) {
        musicSound.play();
        document.getElementById('muted').classList.remove('fa-volume-xmark');
        document.getElementById('muted').classList.add('fa-volume-high');
    } else {
        musicSound.pause();
        document.getElementById('muted').classList.remove('fa-volume-high');
        document.getElementById('muted').classList.add('fa-volume-xmark');
    }
})