function init() {
  // * Dom Elements
  const grid = document.querySelector('.grid')
  const start = document.querySelector('button')
  const scoreDisplay = document.querySelector('#score-Display')
  const highScoreDisplay = document.querySelector('#High-score')
  // const deathWall = document.querySelector('wall')

  const cells = [];
  const width = 20
  const cellCount = width * width
  const deathWall =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,379,359,339,319,299,279,259,239,219,199,179,159,139,119,99,79,59,39]

  let snake = [45, 44, 43]
  let applePosition = 50
  let gameSpeed = 500
  let currentSnakeDirection
  let snakeMoveInterval
  let score = 0
  let highScore = 0

  function renderGrid() {
    for (let index = 0; index < cellCount; index++) {
      const cell = document.createElement('div')
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
    snake.unshift(snake[0] + 20);
  }

  function moveUp() {
    snake.pop();
    snake.unshift(snake[0] - 20);
  }



  function setSnakeDirection(e) {
    const x = snake[0] % width;
    const y = Math.floor(snake[0] / width);
    if (e.key === 'ArrowRight' && x < width - 1 && currentSnakeDirection != 'left') {
      currentSnakeDirection = 'right';
      e.preventDefault()
    } else if (e.key === 'ArrowLeft' && x > 0 && currentSnakeDirection != 'right') {
      currentSnakeDirection = 'left';
      e.preventDefault()
    } else if (e.key === 'ArrowDown' && y < width - 1 && currentSnakeDirection != 'up') {
      currentSnakeDirection = 'down';
      e.preventDefault()
    } else if (e.key === 'ArrowUp' && y > 0 && currentSnakeDirection != 'down') {
      currentSnakeDirection = 'up';
      e.preventDefault()
    }

  }
  start.addEventListener('click', startGame);

  function startGame() {
    start.style.color = 'black'
    start.style.backgroundColor = 'black'
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
  }, 10)
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
          console.log('wall hit')
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
      console.log('body hit')
    }

    if (applePosition + width >= width * width || applePosition % width === width - 1 || applePosition % width === 0 || applePosition - width <= 0) {
      cells[applePosition].classList.remove('apples')
      generateRandomApple()
      }

    if (snake.includes(applePosition)) {
      cells[applePosition].classList.remove('apples')
      generateRandomApple()
    }

    if (score > highScore) {
      highScoreDisplay.innerHTML = score
  }

}


function gameOver() {
  clearInterval(snakeMoveInterval)
  clearInterval(fastUpdatePosition)
  alert('GAME OVER. Press "OK" to play again')
  restart()
}

function restart() {
  start.style.backgroundColor = 'rgb(175, 203, 62)'
  start.style.color = 'rgb(28, 89, 0)'
  score = 0
  scoreDisplay.innerHTML = score
  gameSpeed = 500
  removeSnake()
  snake = [45, 44, 43]
  placeSnake()
  startFUP()
  console.log('restart', score)
}



  function speedUp() {
    clearInterval(snakeMoveInterval);
    gameSpeed -= 25
    startGame()
    console.log(gameSpeed)

    if (gameSpeed < 200) {
      gameSpeed = 200
    }

  }




}

window.addEventListener('DOMContentLoaded', init);