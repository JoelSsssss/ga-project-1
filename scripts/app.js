function init() {
  // * Dom Elements
  const grid = document.querySelector('.grid')
  const cells = []
  const width = 10
  const cellCount = width * width
  let snake = [2, 1, 0]
  let snakeHeadPosition = snake[0]
  let applePosition = [44]
  let gameSpeed = 1000
  let currentSnakeDirection = {
    l: false,
    r: false,
    u: false,
    d: false,
  }
  let movementInterval = {
    l: gameSpeed,
    r: gameSpeed,
    d: gameSpeed,
    u: gameSpeed,
  }

  appleEaten = false

  let score = 0
  const scoreDisplay = document.querySelector('#score-Display')




  function renderGrid() {
    for (let index = 0; index < cellCount; index++) {
      const cell = document.createElement('div');
      cell.textContent = index;
      cells.push(cell);
      grid.appendChild(cell);
    }
    placeSnake(snakeHeadPosition)
    placeApple(applePosition)
  }
  renderGrid();

//snake

  function placeSnake() {
    snake.forEach((cell) => cells[cell].classList.add("the-snake"))
  }

  function removeSnake() {
    snake.forEach((cell) => cells[cell].classList.remove("the-snake"))
}

  function moveRight() {
    snake.pop()
    snake.unshift(snake[0] + 1)
  }

  function moveLeft() {
    snake.pop()
    snake.unshift(snake[0] -1)
  }

  function moveDown() {
    snake.pop()
    snake.unshift(snake[0] + 10)
  }

  function moveUp() {
    snake.pop()
    snake.unshift(snake[0] -10)
  }


  


  function moveSnake(e) {
    const x = snakeHeadPosition % width;
    const y = Math.floor(snakeHeadPosition / width);
    removeSnake()
    if (e.key === 'ArrowRight' && x < width - 1) {
      snakeSpeedRight()
      clearInterval(movementInterval.d)
      clearInterval(movementInterval.u)
      clearInterval(movementInterval.l)
      currentSnakeDirection.r = true

      currentSnakeDirection.l = false
      currentSnakeDirection.d = false
      currentSnakeDirection.u = false
    } else if (e.key === 'ArrowLeft' && x > 0) {
      snakeSpeedLeft()
      clearInterval(movementInterval.d)
      clearInterval(movementInterval.u)
      clearInterval(movementInterval.r)
      currentSnakeDirection.l = true

      currentSnakeDirection.r = false
      currentSnakeDirection.u = false
      currentSnakeDirection.d = false
    } else if (e.key === 'ArrowDown' && y < width - 1) {
      snakeSpeedDown()
      clearInterval(movementInterval.u)
      clearInterval(movementInterval.r)
      clearInterval(movementInterval.l)
      currentSnakeDirection.d = true

      currentSnakeDirection.r = false
      currentSnakeDirection.u = false
      currentSnakeDirection.l = false
    } else if (e.key === 'ArrowUp' && y > 0) {
      snakeSpeedUp()
      clearInterval(movementInterval.d)
      clearInterval(movementInterval.r)
      clearInterval(movementInterval.l)
      currentSnakeDirection.u = true

      currentSnakeDirection.d = false
      currentSnakeDirection.r = false
      currentSnakeDirection.l = false
    }
    placeSnake();
  }

  window.addEventListener('keydown', moveSnake);

  
function snakeSpeedRight() {
  clearInterval(appleEaten)
  isAppleEaten()
  clearInterval(movementInterval.r)
  movementInterval.r = setInterval(() => {
    removeSnake()
    moveRight()
    placeSnake()
  }, gameSpeed);
}
function snakeSpeedLeft() {
  clearInterval(appleEaten)
  isAppleEaten()
  clearInterval(movementInterval.l)
  movementInterval.l = setInterval(() => {
    removeSnake()
    moveLeft()
    placeSnake()
  }, gameSpeed);
}
function snakeSpeedDown() {
  clearInterval(appleEaten)
  isAppleEaten()
  clearInterval(movementInterval.d)
  movementInterval.d = setInterval(() => {
    removeSnake()
    moveDown()
    placeSnake()
  }, gameSpeed);
}
function snakeSpeedUp() {
  clearInterval(appleEaten)
  isAppleEaten()
  clearInterval(movementInterval.u)
  movementInterval.u = setInterval(() => {
    removeSnake()
    moveUp()
    placeSnake()
  }, gameSpeed);
}



//apple


function placeApple() {
  applePosition.forEach((cell) => cells[cell].classList.add("apples"))
}

function removeApple() {
  applePosition.forEach((cell) => cells[cell].classList.remove("apples"))
}

function getRandomPosition() {
  return Math.floor(Math.random() * cellCount)
}


//score and interactions

function isAppleEaten(){
  appleEaten = setInterval(() => {
    console.log(currentSnakeDirection.l,'left')
    console.log(currentSnakeDirection.d,'down')
    console.log(currentSnakeDirection.u,'up')
    console.log(currentSnakeDirection.r,'right')
    snakeHeadPosition = snake[0]
    if (applePosition[0] === snakeHeadPosition) {

      removeApple()
      applePosition.push(getRandomPosition())
      // applePosition.shift(0)
      placeApple(applePosition)

      console.log('eaten')
      score ++
      scoreDisplay.innerHTML = score

      speedUp()
    }
  }, gameSpeed);
}

function speedUp() {
  gameSpeed = 500
  if (currentSnakeDirection.r = true) {
    clearInterval(movementInterval.r)
    snakeSpeedRight()

  }else if (currentSnakeDirection.l = true) {
    clearInterval(movementInterval.l)
    snakeSpeedLeft()

  }else if (currentSnakeDirection.u = true) {
    clearInterval(movementInterval.u)
    snakeSpeedUp()

  }else if (currentSnakeDirection.d = true) {
    clearInterval(movementInterval.d)
    snakeSpeedDown()
  }
}








}

window.addEventListener('DOMContentLoaded', init);
