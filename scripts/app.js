function init() {
  // * Dom Elements
  const grid = document.querySelector('.grid')
  const start = document.querySelector('button')
  const scoreDisplay = document.querySelector('#score-Display')
  const highScoreDisplay = document.querySelector('#High-score')
  // const deathWall = document.querySelector('wall')

  const cells = [];
  const width = 10;
  const cellCount = width * width
  const deathWall =[0,1,2,3,4,5,6,7,8,9,10,19,29,39,49,59,69,79,89,99,20,30,40,50,60,70,80,90,91,92,93,94,95,96,97,98]

  let snake = [13, 12, 11]
  let applePosition = 44
  let gameSpeed = 1000
  let currentSnakeDirection
  let snakeMoveInterval
  let score = 0
  let highScore = 0

  function renderGrid() {
    for (let index = 0; index < cellCount; index++) {
      const cell = document.createElement('div');
      // cell.textContent = index;
      cells.push(cell);
      grid.appendChild(cell);
    }
    placeSnake();
    placeApple(applePosition);
  }
  renderGrid();




function renderWall() {
  deathWall.forEach((cell) => cells[cell].classList.add('wall'))
}
renderWall()

  function placeSnake() {
    snake.forEach((cell) => cells[cell].classList.add('the-snake'))
  }


  function removeSnake() {
    snake.forEach((cell) => cells[cell].classList.remove('the-snake'));
  }

  function moveRight() {
    snake.pop();
    snake.unshift(snake[0] + 1);
  }

  function moveLeft() {
    snake.pop();
    snake.unshift(snake[0] - 1);
  }

  function moveDown() {
    snake.pop();
    snake.unshift(snake[0] + 10);
  }

  function moveUp() {
    snake.pop();
    snake.unshift(snake[0] - 10);
  }



  function setSnakeDirection(e) {
    const x = snake[0] % width;
    const y = Math.floor(snake[0] / width);
    if (e.key === 'ArrowRight' && x < width - 1 && currentSnakeDirection != 'left') {
      currentSnakeDirection = 'right';
    } else if (e.key === 'ArrowLeft' && x > 0 && currentSnakeDirection != 'right') {
      currentSnakeDirection = 'left';
    } else if (e.key === 'ArrowDown' && y < width - 1 && currentSnakeDirection != 'up') {
      currentSnakeDirection = 'down';
    } else if (e.key === 'ArrowUp' && y > 0 && currentSnakeDirection != 'down') {
      currentSnakeDirection = 'up';
    }

  }
  start.addEventListener('click', startGame);

  function startGame() {
    startFUP()
    snakeMoveInterval = setInterval(() => {
      removeSnake();
      switch (currentSnakeDirection) {
        case 'right':
          moveRight();
          break;
        case 'left':
          moveLeft();
          break;
        case 'down':
          moveDown();
          break;
        case 'up':
          moveUp();
          break;
      }
      placeSnake();
      // positionUpdate();
    }, gameSpeed);
  }

  window.addEventListener('keydown', setSnakeDirection);

  //apple

  function placeApple() {
    cells[applePosition].classList.add('apples');
  }


  function generateRandomApple() {
    applePosition = Math.floor(Math.random() * cellCount);
    placeApple();
  }

  //score and interactions

function startFUP () {
    fastUpdatePosition = setInterval(() => {
    positionUpdate();
  }, 100)
}

  function positionUpdate() {

    if (cells[snake[0]].classList.contains('apples')) {
      cells[snake[0]].classList.remove('apples');
      speedUp();
      generateRandomApple()

      score ++
      scoreDisplay.innerHTML = score

      snake.push(4)
    }

    if  ((snake[0] + width >= width * width && currentSnakeDirection === "down") ||
        (snake[0] % width === width - 1 && currentSnakeDirection === "right") ||
        (snake[0] % width === 0 && currentSnakeDirection === "left") ||
        (snake[0] - width <= 0 && currentSnakeDirection === "up")) {
          gameOver()
    }

    if ((currentSnakeDirection === "right" &&
    cells[snake[0] + 1].classList.contains("the-snake")) ||
    (currentSnakeDirection === "down" &&
    cells[snake[0] + 10].classList.contains("the-snake")) ||
    (currentSnakeDirection === "left" &&
    cells[snake[0] - 1].classList.contains("the-snake")) ||
    (currentSnakeDirection === "up" &&
    cells[snake[0] - 10].classList.contains("the-snake"))) {
      gameOver()
    }

    if (applePosition + width >= width * width || applePosition % width === width - 1 || applePosition % width === 0 || applePosition - width <= 0) {
      cells[applePosition].classList.remove('apples')
      generateRandomApple()
      }

    if (snake.includes(applePosition)) {
      cells[applePosition].classList.remove('apples')
      generateRandomApple()
    }

    if (highScore < score) {
      highScoreDisplay.innerHTML = score
  }

}


function gameOver() {
  clearInterval(snakeMoveInterval)
  clearInterval(fastUpdatePosition)
  alert('game over')
  restart()
}

function restart() {
  score = 0
  scoreDisplay.innerHTML = score
  gameSpeed = 1000
  removeSnake()
  snake = [13, 12, 11]
  placeSnake()
  startFUP()
  console.log('restart', score)
}



  function speedUp() {
    clearInterval(snakeMoveInterval);
    gameSpeed -= 50
    startGame()
    console.log(gameSpeed)

    if (gameSpeed < 200) {
      gameSpeed = 200
    }

  }


}

window.addEventListener('DOMContentLoaded', init);