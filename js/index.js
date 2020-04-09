const canvas = document.getElementById('canvas');
canvas.width = 600;
canvas.height = 600;

const ctx = canvas.getContext('2d');
let animateId = null;

//*Image load and drawing with canvas*/
let carImg = new Image();
carImg.src = './images/car.png'; //Loads the car
let boardImg = new Image();
boardImg.src = './images/road.png'; //Loads the car

//This is our car
let car = {
  //This is your car object
  x: canvas.width / 2 - 25,
  y: 500,
  image: carImg,
};

let obs1 = {
  //This is your car object
  x: 76,
  y: 0,

  // image: carImg,
};

let obs2 = {
  //This is your car object
  x: 325,
  y: 150,
  // image: carImg,
};

function obsLeft(i) {
  console.log(i);
  ctx.fillStyle = 'purple';
  ctx.fillRect(obs1.x, (obs1.y += i), 250, 30);
}

function obsRight(i) {
  ctx.fillStyle = 'purple';
  ctx.fillRect(obs2.x, (obs2.y += i), 200, 30);
}

function drawCar() {
  ctx.drawImage(car.image, car.x, car.y, 50, 50);
}

function drawBoard() {
  ctx.drawImage(boardImg, 0, 0, 600, 600);
}

// DETECT COLLISION CODE
function detectCollision() {
  var a = { x: obsRight.x, y: obsRight.y, width: 200, height: 200 }; //Our purple square
  var b = { x: car.x, y: car.y, width: 100, height: 140 }; //Our car


console.log((
  a.x < b.x + b.width &&
  a.x + a.width > b.x &&
  a.y < b.y + b.height &&
  a.y + a.height > b.y
))

  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    // collision detected!
    console.log(' the rectangles colided');
  }
}

//CAR MOVEMENT

function detectMove() {
  document.body.onkeydown = function (e) {
    console.log(e);
    switch (e.keyCode) {
      case 37:
        car.x === 75
          ? console.log('Border!')
          : ((car.x -= 20), console.log(car.x));
        break;

      case 39:
        car.x === 475
          ? console.log('Border!')
          : ((car.x += 20), console.log(car.x));
        break;
      default:
        break;
    }
  };
}

function startGame() {
  let i = 0;
  i += 2;
  document.getElementsByClassName('game-intro')[0].style.display = 'none';
  drawBoard();
  drawCar();
  obsLeft(i);
  obsRight(i);
  detectCollision()
  
  animateId = window.requestAnimationFrame(startGame); //Game rendering -infinite loop that goes super fast
}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
    detectMove();
  };
};
