function init() {
  // * Dom Elements
  const grid = document.querySelector('.grid');
  const start = document.querySelector('button');
  const scoreDisplay = document.querySelector('#score-Display');

  const cells = [];
  const width = 10;
  const cellCount = width * width;

  let snake = [13, 12, 11];
  let applePosition = 44;
  let gameSpeed = 1000;
  let currentSnakeDirection;
  let snakeMoveInterval;
  let score = 0;

  function renderGrid() {
    for (let index = 0; index < cellCount; index++) {
      const cell = document.createElement('div');
      cell.textContent = index;
      cells.push(cell);
      grid.appendChild(cell);
    }
    placeSnake();
    placeApple(applePosition);
  }
  renderGrid();

  //snake

  function placeSnake() {
    snake.forEach((cell) => cells[cell].classList.add('the-snake'));
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
    if (e.key === 'ArrowRight' && x < width - 1) {
      currentSnakeDirection = 'right';
    } else if (e.key === 'ArrowLeft' && x > 0) {
      currentSnakeDirection = 'left';
    } else if (e.key === 'ArrowDown' && y < width - 1) {
      currentSnakeDirection = 'down';
    } else if (e.key === 'ArrowUp' && y > 0) {
      currentSnakeDirection = 'up';
    }

  }
  start.addEventListener('click', startGame);

  function startGame() {
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
      positionUpdate();
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


  function positionUpdate() {

    if (cells[snake[0]].classList.contains('apples')) {
      cells[snake[0]].classList.remove('apples');
      speedUp();
      generateRandomApple();

      score ++
      scoreDisplay.innerHTML = score

      snake.push(4)
    }

    const x = snake[0] % width;
    const y = Math.floor(snake[0] / width);

    if  ((snake[0] + width >= width * width && currentSnakeDirection === "down") ||
        (snake[0] % width === width - 1 && currentSnakeDirection === "right") ||
        (snake[0] % width === 0 && currentSnakeDirection === "left") ||
        (snake[0] - width <= 0 && currentSnakeDirection === "up")) {
          gameOver()
    }
    
    // else if (cells[snake[0] + currentSnakeDirection].classList.contains('the-snake')) {
      //gameOver()
    //}

    // const snakeHead = snake[0]
    // const snaketail = snake[1,2,3,4,5,6,7,8,9]

    // if (cells[snake[0]].classList.contains('the-snake')) {
    //   gameOver()
    // }




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







  }


function gameOver() {
  clearInterval(snakeMoveInterval)
  console.log('death')
}

  function speedUp() {
    clearInterval(snakeMoveInterval);
    gameSpeed = 500;
    startGame();
  }



}

window.addEventListener('DOMContentLoaded', init);