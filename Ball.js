// // export const createBall = (ballElement) => {
// //     return {ballElement: ballElement};
// // }

// const INITIAL_VELOCITY = 0.025
// const VELOCITY_INCREASE = 0.00001


// export default class createBall {
//     constructor(ballElement) {
//         this.ballElement = ballElement
//         this.reset()
//     }

//     get x() {
//         // Taken value from CSS and converted into a JS # we can use
//         return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--x"));
//     }

//     set x(value) {
//         this.ballElement.style.setProperty("--x", value)
//     }
//     get y() {
//         return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--y"));
//     }

//     set y(value) {
//         this.ballElement.style.setProperty("--y", value)
//     }

//     rect() {
//         return this.ballElement.getBoundingClientRect();
//     }

//     reset() {
//         this.x = 50
//         this.y = 50

//         //Using a while loop to make sure the ball moves at an optimal pace to the left and right
//         this.direction = { x: 0 }
//          // Getting a # between 0 and 2 PI which is essentially 360° given in radians (unit of angle)
//             // With radians we can use cosine and sine (trig functions of an angle) to determine the x and y direction
//         while (
//           Math.abs(this.direction.x) <= 0.2 ||
//           Math.abs(this.direction.x) >= 0.9
//         ) {
//           const heading = randomNumberBetween(0, 2 * Math.PI)
//           this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
//         }
//         this.velocity = INITIAL_VELOCITY
//       }

//     //This will update the positioning using our getter and setter
//    update(delta, paddleRects) {
//     this.x += this.direction.x * this.velocity * delta
//     this.y += this.direction.y * this.velocity * delta
//     this.velocity += VELOCITY_INCREASE * delta
//     const rect = this.rect()

//     if (rect.bottom >= window.innerHeight || rect.top <= 0) {
//       this.direction.y *= -1
//     }

//     if (paddleRects.some(r => isCollision(r, rect))) {
//       this.direction.x *= -1
//     }
//   }
// }

// function randomNumberBetween(min, max) {
//     return Math.random() * (max - min) + min
//   }
  
//   function isCollision(rect1, rect2) {
//     return (
//       rect1.left <= rect2.right &&
//       rect1.right >= rect2.left &&
//       rect1.top <= rect2.bottom &&
//       rect1.bottom >= rect2.top
//     )
//   }

const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = 0.00001

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem
    this.reset()
  }

  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
  }

  set x(value) {
    this.ballElem.style.setProperty("--x", value)
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
  }

  set y(value) {
    this.ballElem.style.setProperty("--y", value)
  }

  rect() {
    return this.ballElem.getBoundingClientRect()
  }

  reset() {
    this.x = 50
    this.y = 50
    this.direction = { x: 0 }
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI)
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
    }
    this.velocity = INITIAL_VELOCITY
  }

  update(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta
    this.y += this.direction.y * this.velocity * delta
    this.velocity += VELOCITY_INCREASE * delta
    const rect = this.rect()

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1
    }

    if (paddleRects.some(r => isCollision(r, rect))) {
      this.direction.x *= -1
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min
}

function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  )
}