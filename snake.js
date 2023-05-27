// Obtener referencia al tablero del juego
const gameBoard = document.getElementById("game-board");

// Variables del juego
const gridSize = 20;
const gridSizeInPixels = 400;
let snake = [{ x: 0, y: 0 }];
let food = getRandomPosition();

let xVelocity = 0;
let yVelocity = 0;
let intervalId;

// Evento de teclado para controlar la dirección del movimiento de la serpiente
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  switch (event.key) {
    case "ArrowUp":
      if (yVelocity !== 1) {
        yVelocity = -1;
        xVelocity = 0;
      }
      break;
    case "ArrowDown":
      if (yVelocity !== -1) {
        yVelocity = 1;
        xVelocity = 0;
      }
      break;
    case "ArrowLeft":
      if (xVelocity !== 1) {
        yVelocity = 0;
        xVelocity = -1;
      }
      break;
    case "ArrowRight":
      if (xVelocity !== -1) {
        yVelocity = 0;
        xVelocity = 1;
      }
      break;
  }
}

function startGame() {
  intervalId = setInterval(updateGame, 100);
}

function updateGame() {
  clearBoard();
  moveSnake();
  drawSnake();
  drawFood();
  checkCollision();
}

function clearBoard() {
  gameBoard.innerHTML = "";
}

function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  if (!isFoodEaten()) {
    snake.pop();
  }
}

function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.classList.add("snake");
    snakeElement.style.left = segment.x * gridSize + "px";
    snakeElement.style.top = segment.y * gridSize + "px";
    gameBoard.appendChild(snakeElement);
  });
}

function drawFood() {
  const foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.left = food.x * gridSize + "px";
  foodElement.style.top = food.y * gridSize + "px";
  gameBoard.appendChild(foodElement);
}

function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= gridSize ||
    snake[0].y < 0 ||
    snake[0].y >= gridSize ||
    isSnakeCollision()
  ) {
    clearInterval(intervalId);
    alert("Game Over");
  }
  if (isFoodEaten()) {
    food = getRandomPosition();
  }
}

function isSnakeCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  return false;
}

function isFoodEaten() {
  return snake[0].x === food.x && snake[0].y === food.y;
}

function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };
}

startGame();
