// const canvasEl = document.querySelector("canvas");
// const canvasContext = canvasEl.getContext("2d");

// canvasEl.width = 1500;
// canvasEl.height = 720;
// // --------------------------------------------------------------------
// let RIScore = new Audio();
// let AIScore = new Audio();
// let hit = new Audio();
// let wall = new Audio();

// hit.src = "sounds/hit.mp3";
// wall.src = "sounds/wall.mp3";
// AIScore.src = "sounds/AIScore.mp3";
// RIScore.src = "sounds/RIScore.mp3";

// // The RI Player Paddle
// const playerPaddleRI = {
//   xP: 0,
//   yP: canvasEl.height / 2 - 100 / 2,
//   height: 100,
//   width: 10,
//   color: "#d2e603",
//   score: 0,
// };

// // The AI Player Paddle
// const playerPaddleAI = {
//   xP: canvasEl.width - 10,
//   yP: canvasEl.height / 2 - 100 / 2,
//   height: 100,
//   width: 10,
//   color: "orange",
//   score: 0,
// };

// // Creating the Ball
// const ball = {
//   xP: canvasEl.width / 2,
//   yP: canvasEl.height / 2,
//   radius: 10,
//   speed: 7,
//   xV: 5,
//   yV: 5,
//   color: "white",
// };

// // Creating the net
// const net = {
//   xP: canvasEl.width / 2 - 1,
//   yP: 0,
//   width: 2,
//   height: 10,
//   color: "white",
// };

// // Drawing the canvas
// function drawRect(xP, yP, width, height, color) {
//   canvasContext.fillStyle = color;
//   canvasContext.fillRect(xP, yP, width, height);
// }

// // Drawing a circle
// function drawCircle(xP, yP, radius, color) {
//   canvasContext.fillStyle = color;
//   canvasContext.beginPath();
//   canvasContext.arc(xP, yP, radius, 0, Math.PI * 2);
//   canvasContext.fill();
// }

// // Drawing the text
// function drawText(content, xP, yP, color) {
//   canvasContext.fillStyle = color;
//   canvasContext.font = "35px sans-serif";
//   canvasContext.fillText(content, xP, yP);
// }

// // Drawing the net
// function drawNet() {
//   for (let i = 0; i < canvasEl.height; i += 15) {
//     drawRect(net.xP, net.yP + i, net.width, net.height, net.color);
//   }
// }

// // runGame Function AKA The Game Loop
// function runGame() {
//   // clearing the canvas
//   drawRect(0, 0, canvasEl.width, canvasEl.height, "#4683a0");

//   // Draw net function
//   drawNet();

//   // draw score function
//   drawText(
//     playerPaddleRI.score,
//     (1 * canvasEl.width) / 4,
//     (1 * canvasEl.height) / 10,
//     "white"
//   );
//   drawText(
//     playerPaddleAI.score,
//     (3 * canvasEl.width) / 4,
//     (1 * canvasEl.height) / 10,
//     "white"
//   );

//   // drawing the paddles for RI and AI
//   drawRect(
//     playerPaddleRI.xP,
//     playerPaddleRI.yP,
//     playerPaddleRI.width,
//     playerPaddleRI.height,
//     playerPaddleRI.color
//   );

//   drawRect(
//     playerPaddleAI.xP,
//     playerPaddleAI.yP,
//     playerPaddleAI.width,
//     playerPaddleAI.height,
//     playerPaddleAI.color
//   );

//   // drawing the ball
//   drawCircle(ball.xP, ball.yP, ball.radius, ball.color);
// }

// // The player Paddle RI Event Listener
// canvasEl.addEventListener("mousemove", movePaddle);
// function movePaddle(e) {
//   let canvasRect = canvasEl.getBoundingClientRect();
//   playerPaddleRI.yP = e.clientY - canvasRect.top - playerPaddleRI.height / 2;
// }

// // The Collision Detection of Paddles Function
// function paddleColliDete(BALL, PADDLE) {
//   BALL.top = BALL.yP - BALL.radius;
//   BALL.bottom = BALL.yP + BALL.radius;
//   BALL.left = BALL.xP - BALL.radius;
//   BALL.right = BALL.xP + BALL.radius;

//   PADDLE.top = PADDLE.yP;
//   PADDLE.bottom = PADDLE.yP + PADDLE.height;
//   PADDLE.left = PADDLE.xP;
//   PADDLE.right = PADDLE.xP + PADDLE.width;

//   return (
//     BALL.right > PADDLE.left &&
//     BALL.bottom > PADDLE.top &&
//     BALL.left < PADDLE.right &&
//     BALL.top < PADDLE.bottom
//   );
// }

// // the resetBall function
// function resetBall() {
//   ball.xP = canvasEl.width / 2;
//   ball.yP = canvasEl.height / 2;

//   ball.speed = 7;
// }

// // The everything Manager Function
// function everythingManager() {
//   // moving the ball by the amount of acceleration
//   ball.xP += ball.xV;
//   ball.yP += ball.yV;

//   // creating the AI
//   let intelligenceLevel = 0.1;
//   playerPaddleAI.yP +=
//     (ball.yP - (playerPaddleAI.yP + playerPaddleAI.height / 2)) *
//     intelligenceLevel;

//   // bouncing off the top and bottom walls
//   if (ball.yP + ball.radius > canvasEl.height || ball.yP - ball.radius < 0) {
//     ball.yV = -ball.yV;
//     wall.play();
//   }

// let player =
//   ball.xP + ball.radius < canvasEl.width / 2
//     ? playerPaddleRI
//     : playerPaddleAI;

// if (paddleColliDete(ball, player)) {
//   hit.play();

//   // when the ball hits the paddle of any player
//   let collisionPoint = ball.yP - (player.yP + player.height / 2);

//   // normalization -> converting -50 & 50 -> -1 & 1 & 0
//   collisionPoint = collisionPoint / (player.height / 2);

//     // calculating the angle at which the bounces back (radians)
//     let bounceAngle = (collisionPoint * Math.PI) / 4;

//     // calculating the direction of the ball when it bounces back
//     let direction = ball.xP + ball.radius < canvasEl.width / 2 ? 1 : -1;

//     // updating the velocity when the ball hits any paddle
//     //https://www.mathsisfun.com/sine-cosine-tangent.html
//     ball.xV = direction * ball.speed * Math.cos(bounceAngle);
//     ball.yV = ball.speed * Math.sin(bounceAngle);

//     // after each bounce back, the speed of the ball should be increased
//     ball.speed += 0.1;
//   }

//   // updating the scores
//   if (ball.xP + ball.radius < 0) {
//     // the AI scored
//     playerPaddleAI.score++;
//     AIScore.play();
//     resetBall();
//   } else if (ball.xP - ball.radius > canvasEl.width) {
//     // the RI scored
//     playerPaddleRI.score++;
//     RIScore.play();
//     resetBall();
//   }
// }

// // The Game Initialization function
// function gameInit() {
//   everythingManager();
//   runGame();
// }
// // Looping the game to keep it running
// const FPS = 60;
// setInterval(gameInit, 1000 / FPS);

// stand up for yourself; stop doubting yourself

/* my code below */

canvasEl = document.querySelector("canvas");
canvasCTX = canvasEl.getContext("2d");

canvasEl.width = 1500;
canvasEl.height = 720;

//=-=-=-=-=-=--=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=--=

let RIScore = new Audio();
let AIScore = new Audio();
let hit = new Audio();
let wall = new Audio();

RIScore.src = "sounds/RIScore.mp3";
AIScore.src = "sounds/AIScore.mp3";
hit.src = "sounds/hit.mp3";
wall.src = "sounds/wall.mp3";

//=-=-=-=-=-=-=-=--=-=- OBJECTS for game elements -=-=-=-=-=-=-=-=-

// the RI player's paddle

const playerPaddleRI = {
  xP: 0,
  yP: canvasEl.height / 2 - 100 / 2,
  height: 100,
  width: 20,
  color: "aqua",
  score: 0,
};

// the AI player's paddle

const playerPaddleAI = {
  xP: canvasEl.width - 20,
  yP: canvasEl.height / 2 - 100 / 2,
  height: 100,
  width: 20,
  color: "peachpuff",
  score: 0,
};

// CREATE the ball (as opposed to drawing the ball)

const ball = {
  xP: canvasEl.width / 2,
  yP: canvasEl.height / 2,
  radius: 10,
  speed: 7,
  xV: 5,
  yV: 5,
  color: "black",
};

const net = {
  xP: canvasEl.width / 2 - 1,
  yP: 0,
  width: 2,
  height: 10,
  color: "yellow",
};

// draw the canvas

function drawRect(xP, yP, width, height, color) {
  canvasCTX.fillStyle = color;
  canvasCTX.fillRect(xP, yP, width, height);
}

// draw the ball

function drawCircle(xP, yP, radius, color) {
  canvasCTX.fillStyle = color;
  canvasCTX.beginPath();
  canvasCTX.arc(xP, yP, radius, 0, Math.PI * 2);
  canvasCTX.fill();
}

// draw the text

function drawText(content, xP, yP, color) {
  canvasCTX.fillStyle = color;
  canvasCTX.font = "35px sans-serif";
  canvasCTX.fillText(content, xP, yP);
}

// drawing the net

function drawNet() {
  for (let w = 0; w < canvasEl.height; w += 15) {
    drawRect(net.xP, net.yP + w, net.width, net.height, net.color);
  }
}

// =-=-=-=-=-=-=-==-=-=-=--=-=- THE GAME LOOP -=-=-=--=-==-=-=-=-=-

function runGame() {
  // clearing the canvas
  drawRect(0, 0, canvasEl.width, canvasEl.height, "#708090");

  drawNet();

  drawText(
    playerPaddleRI.score,
    (1 * canvasEl.width) / 4,
    (1 * canvasEl.height) / 10,
    "yellow"
  );

  drawText(
    playerPaddleAI.score,
    (3 * canvasEl.width) / 4,
    (1 * canvasEl.height) / 10,
    "yellow"
  );

  drawRect(
    playerPaddleRI.xP,
    playerPaddleRI.yP,
    playerPaddleRI.width,
    playerPaddleRI.height,
    playerPaddleRI.color
  );

  drawRect(
    playerPaddleAI.xP,
    playerPaddleAI.yP,
    playerPaddleAI.width,
    playerPaddleAI.height,
    playerPaddleAI.color
  );

  drawCircle(ball.xP, ball.yP, ball.radius, "black");
}

// the player paddle RI event listener

canvasEl.addEventListener("mousemove", movePaddle);
function movePaddle(e) {
  let canvasRect = canvasEl.getBoundingClientRect();
  playerPaddleRI.yP = e.clientY - canvasRect.top - playerPaddleRI.height / 2;
}
// the paddles collision detection function

function paddleCollision(BALL, PADDLE) {
  BALL.top = BALL.yP - BALL.radius;
  BALL.bottom = BALL.yP + BALL.radius;
  BALL.left = BALL.xP - BALL.radius;
  BALL.right = BALL.xP + BALL.radius;

  PADDLE.top = PADDLE.yP;
  PADDLE.bottom = PADDLE.yP + PADDLE.height;
  PADDLE.left = PADDLE.xP;
  PADDLE.right = PADDLE.xP + PADDLE.width;

  return (
    BALL.right > PADDLE.left &&
    BALL.bottom > PADDLE.top &&
    BALL.left < PADDLE.right &&
    BALL.top < PADDLE.bottom
  );
}

// the reset ball function
function resetBall() {
  ball.xP = canvasEl.width / 2;
  ball.yP = canvasEl.height / 2;

  ball.speed = 7;
}

// the everything manager function
function everythingManager() {
  ball.xP += ball.xV;
  ball.yP += ball.yV;

  let intelligenceLevel = 0.1;
  playerPaddleAI.yP +=
    (ball.yP - (playerPaddleAI.yP + playerPaddleAI.height / 2)) *
    intelligenceLevel;

  if (ball.yP + ball.radius > canvasEl.height || ball.yP - ball.radius < 0) {
    ball.yV = -ball.yV;
    wall.play();
  }

  let player =
    ball.xP + ball.radius < canvasEl.width / 2
      ? playerPaddleRI
      : playerPaddleAI;

  if (paddleCollision(ball, player)) {
    hit.play();

    let collisionPoint = ball.yP - (player.yP + player.height / 2);

    // normalization -=-=-=- converting -50 and 50 to -1 and 1 or somewhere in that range
    collisionPoint = collisionPoint / (player.height / 2);

    // calculating the bounce angle at which the ball bounces back (this will be in radians)
    let bounceAngle = (collisionPoint * Math.PI) / 4;

    // calculating the direction of the ball when it bounces back
    let direction = ball.xP + ball.radius < canvasEl.width / 2 ? 1 : -1;

    // updating the velocity when the ball hits either paddle
    ball.xV = direction * ball.speed * Math.cos(bounceAngle);
    ball.yV = ball.speed * Math.sin(bounceAngle);

    // increase speed of the ball after each bounce
    ball.speed += 0.1;
  }

  // updating the scores
  if (ball.xP + ball.radius < 0) {
    // this means that the AI has scored
    playerPaddleAI.score++;
    AIScore.play();
    resetBall();
  } else if (ball.xP - ball.radius > canvasEl.width) {
    // this means that the RI scored
    playerPaddleRI.score++;
    RIScore.play();
    resetBall();
  }
}

// game initialization

function gameInit() {
  everythingManager();
  runGame();
}

// looping the game to keep it running
const FPS = 60;
setInterval(gameInit, 1000 / FPS);
