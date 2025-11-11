

let buttonColors = ["red", "blue", "green", "yellow"];
let randomChosenColor
let selectedColor
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameIsRunning = false;
let highScore = 0;


function nextSequence() {
    if (gameIsRunning) {
        let randomNumber = Math.floor(Math.random() * 4);
        randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
        level++;
        $("h1").text("Level " + level);
        userClickedPattern = [];
    }
}

function playSound(color) {
    let sound = new Audio("./sounds/" + color + ".mp3");
    sound.play();
}
function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}
$(document).keypress(function () {
    if (level === 0) {
        gameIsRunning = true
        nextSequence();
    }

})

$(".btn").click(function (e) {
    if (gameIsRunning) {
        selectedColor = e.target.id;
        userClickedPattern.push(selectedColor);
        playSound(selectedColor);
        animatePress(selectedColor);
        checkAnswer(userClickedPattern.length - 1);
    }
});
function checkAnswer(Level) {
    if (gamePattern[Level] === userClickedPattern[Level]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    checkHighest(level);
    $("#highest-score").text("Highest Score: " + highScore);
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameIsRunning = false;
}
function checkHighest(score) {
    if (score > highScore) {
        highScore = score;
    }
}