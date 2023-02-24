## Description:

This was the first project I did for the General Assembly Software Immersive Course. The goal of this project is to create a game of our choosing using HTML JavaScript and CSS. The game I chose to make is ‘Snake’. It was done in a style similar to the original Nokia version by using a similar colour palette. It has the same gameplay and same rules as the original.

## Deployment link:

https://joelssssss.github.io/ga-project-1/

## Getting Started/Code Installation:

This code does not require any installations other than the code itself to work.

1. Install the ‘Project 1’ code
2. Open the code with live server (In ‘Visual Studio Code’ this can be done by right clicking the ‘index.html’ folder in the ‘EXPLORER’ menu and selecting ‘Open with live server’.
3. Press start when the game opens and move the snake using the arrow keys.
4. Move the snake towards the red squares to get points.

## Timeframe and working team:

This project was done over the course of 1 week, independently.

## Technologies used:

- Visual Studio Code (Code Editor I used)
- HTML
- JavaScript
- CSS
- Google Chrome (where the game was played)

## Brief:

### Technical Requirements

Your app must:

- Render a game in the browser
- Design logic for winning & visually display which player won
- Include separate HTML / CSS / JavaScript files
- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
- Use \*\*JavaScript for DOM manipulation
- Deploy your game online, where the rest of the world can access it
- Use semantic markup for HTML and CSS (adhere to best practices)

### Necessary Deliverables

- A working game, built by you, hosted somewhere on the internet
- A link to your hosted working game in the URL section of your Github repo
- A git repository hosted on Github, with a link to your hosted game, and frequent commits dating back to the very beginning of the project
- A readme.md file with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.

## Planning:

I made a rough sketch of what I planned to do for the snake game using Excalidraw. It illustrated how I planned to move to make the game and the order of what I planned to code.

In Excalidraw I made an illustrated wireframe to help me understand what I needed to do first.

1. Wrote pseudocode
2. Made a wireframe
3. Began coding in the order shown by the wireframe
4. Bug fixes

![snake1](https://i.imgur.com/gYYdedR.png)
![image](https://i.imgur.com/6PfVYk1.png)

## Build/Code Process

The first thing I did was create the ‘app.js’, ‘main.css’ and ‘index.html’ files.
I wrote basic code for the scoreboard to show (not functional) and a basic grid.

![image](https://i.imgur.com/a3umPug.png)

```javascript let snake = [45, 44, 43]
let applePosition = 50;
let gameSpeed = 500;
let currentSnakeDirection;
let snakeMoveInterval;
let score = 0;
let highScore = 0;

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
```

The Image/code shows more code than I had at this stage because it is the final code.

I then wrote code for the ‘snake’.

The snake moved on a grid. At this point of development it was a 10X10 grid. Each cell was used to determine where the snake was and where the snake would go. For example, the snake would start off at cell 20 and be asked to move down by 1 cell, that would be cell 30.
I then made a ‘setInterval’ that would move the snake every time it ‘ticks’. The speed of which depended on the ‘gamespeed’ value. By default it was 1 second but gets smaller every time an apple is eaten by the snake.

The snake itself is an array of 4 cells that would add an extra every time a food item is eaten.

I initially planned in my wireframe to code the apple first. However, I considered the snake movement would be more challenging to code, therefore I decided to deal with that challenge first.

```javascript
function setSnakeDirection(e) {
  const x = snake[0] % width;
  const y = Math.floor(snake[0] / width);
  if (
    e.key === 'ArrowRight' &&
    x < width - 1 &&
    currentSnakeDirection != 'left'
  ) {
    currentSnakeDirection = 'right';
    e.preventDefault();
  } else if (
    e.key === 'ArrowLeft' &&
    x > 0 &&
    currentSnakeDirection != 'right'
  ) {
    currentSnakeDirection = 'left';
    e.preventDefault();
  } else if (
    e.key === 'ArrowDown' &&
    y < width - 1 &&
    currentSnakeDirection != 'up'
  ) {
    currentSnakeDirection = 'down';
    e.preventDefault();
  } else if (e.key === 'ArrowUp' && y > 0 && currentSnakeDirection != 'down') {
    currentSnakeDirection = 'up';
    e.preventDefault();
  }
}
start.addEventListener('click', startGame);

function startGame() {
  start.style.color = 'black';
  start.style.backgroundColor = 'black';
  startFUP();
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
```

```javascript
if (
  (snake[0] + width >= width * width && currentSnakeDirection === 'down') ||
  (snake[0] % width === width - 1 && currentSnakeDirection === 'right') ||
  (snake[0] % width === 0 && currentSnakeDirection === 'left') ||
  (snake[0] - width <= 0 && currentSnakeDirection === 'up')
) {
  gameOver();
  console.log('wall hit');
}

if (
  (currentSnakeDirection === 'right' &&
    cells[snake[0] + 1].classList.contains('the-snake')) ||
  (currentSnakeDirection === 'down' &&
    cells[snake[0] + 10].classList.contains('the-snake')) ||
  (currentSnakeDirection === 'left' &&
    cells[snake[0] - 1].classList.contains('the-snake')) ||
  (currentSnakeDirection === 'up' &&
    cells[snake[0] - 10].classList.contains('the-snake'))
) {
  gameOver();
  console.log('body hit');
}
```

The next task was to make the food (apple). The code for the apple works with an if statement. If a cell contains both the snake head (snake array [0]) and an apple, the apple would change to a random position and 1 point will be added to the score.

I then wanted to add the failstates and interactions between the snake and the apple. I also wrote ‘if’ statements that changed the snake’s code so it gets bigger by one cell when it has eaten an apple by adding an extra number to the array. The apple also does not appear inside the snake when randomly appearing in the grid. This is done with another if statement, If it appears inside a cell occupied by any snake part it will randomly choose another position.

```javascript
//apple

function placeApple() {
  cells[applePosition].classList.add('apples');
}

function generateRandomApple() {
  applePosition = Math.floor(Math.random() * cellCount);
  placeApple();
}

//score and interactions

function startFUP() {
  fastUpdatePosition = setInterval(() => {
    positionUpdate();
  }, 10);
}
```

```javascript
if (
  applePosition + width >= width * width ||
  applePosition % width === width - 1 ||
  applePosition % width === 0 ||
  applePosition - width <= 0
) {
  cells[applePosition].classList.remove('apples');
  generateRandomApple();
}

if (snake.includes(applePosition)) {
  cells[applePosition].classList.remove('apples');
  generateRandomApple();
}

if (score > highScore) {
  highScoreDisplay.innerHTML = score;
}
```

I then added a ‘kill wall’.

When the snake array is in a cell identified as ‘deathWall’, it would initiate the game over function. I manually selected every cell number along the perimeter of the grid and marked all those numbers as part of the ‘deathWall’ . A game mechanic was added where the snake would get faster and faster as more apples were eaten. This was done by increasing the ‘Game Time’. Once again this was done with an if statement where if an apple was eaten it would shorten the number labelled as game time. Therefore everything would get faster.

```javascript
function speedUp() {
  clearInterval(snakeMoveInterval);
  gameSpeed -= 25;
  startGame();
  console.log(gameSpeed);

  if (gameSpeed < 200) {
    gameSpeed = 200;
  }
}
```

Bug fixing was the next task.

A lot of bugs were fixed. For example, every time an arrow key was pressed, the snake would move instantly to the next grid cell, regardless of the current game time. To fix this, the arrow key would no longer move the snake but choose the ‘current snake direction’ instead. This would change the snake's direction of movement but not move the snake instantly.

```javascript
function startGame() {
  start.style.color = 'black';
  start.style.backgroundColor = 'black';
  startFUP();
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
```

Some glitches I was not able to fix. Hitting the left wall would crash the game. I looked through the code and the code for the left wall was identical for all the others.

## Challenges:

A challenge I faced was the grid size. Because the grid ‘deathWall’ was only able to work by being part of the grid itself, it decreased the already small playable area size by 36 cells. Therefore, I had to increase the grid size. I was not familiar with how grids were made in JavaScript but I was able to get the size to increase by changing the grid width to 20 instead of 10 .

## Win:

When I increased the size of the grid, the cells that were identified as the ‘death wall’ were incorrect. I had to manually declare specific cells at the death wall. I did not know of a more efficient way but it worked and I was happy about that.

```javascript
const cells = [];
const width = 20
const cellCount = width \* width
const deathWall =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,379,359,339,319,299,279,259,239,219,199,179,159,139,119,99,79,59,39]
```

## Key learnings:

Planning your code from the start is a big help when coding later on. For example: the snake array was all under one name (‘snake’). I ran into many issues when trying to create a fail state for when the snake's head (array 0) came into contact with the other parts of the snake. It would initiate the game over function instantly because it would see that the head (array 0) was in contact with the snake body (every part of the snake, even array 0).

If I did better planning I would have made the snake head separate from the rest of the snake.

Furthermore, save more time for bug fixing. Bug fixing was much more time consuming than anticipated.

My ability to use functions definitely got better. Before I did not know how functions worked but after a bit of practice I was able to implement them in my project.

## Bugs:

When hitting the left wall, the game crashes
The front end of the snake has 1 invisible cell in front of it that will cause a game over if it touches the body.
Random game overs

If I had more time I would go and look at examples on how specific features were implemented and try to apply them to my code.

## Future improvements:

- Create a more detailed plan to prevent problems in the future.
- Give more time for bug fixes
