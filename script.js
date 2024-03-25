// import createBall  from "./Ball";

// // Selecting the ball element and creating a new class for it
// const ball = new createBall(document.getElementById('ball'));
// const playerPaddle = new Paddle(document.getElementById("player-paddle"))
// const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
// const playerScoreElem = document.getElementById("player-score")
// const computerScoreElem = document.getElementById("computer-score")

// let lastTime;
// // Creating an infinite loop to run the game, called every time the screen is allowed to change
// function update(time) {
//     if (lastTime != null) {
//         //Converting the time passed in into delta
//         const delta = time - lastTime;

//         //Update code, using delta so all movements are based on it
//         ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
//         computerPaddle.update(delta, ball.y)
//     }
//     lastTime = time;
//     window.requestAnimationFrame(update)
// }

// // Using this instead of setInterval because setInterval isn't always the most accurate,
// // This way we call the function every time something is ran/changed on the screen
// window.requestAnimationFrame(update)


import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

let lastTime
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
    computerPaddle.update(delta, ball.y)
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    )

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

    if (isLose()) handleLose()
  }

  lastTime = time
  window.requestAnimationFrame(update)
}

function isLose() {
  const rect = ball.rect()
  return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
  }
  ball.reset()
  computerPaddle.reset()
}

document.addEventListener("mousemove", e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)