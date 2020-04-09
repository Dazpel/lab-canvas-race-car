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

let niko = new Image();
niko.src = './images/niko.jpeg';
let stefan = new Image();
stefan.src = './images/stefan.jpeg';
let juanchito = new Image();
juanchito.src = './images/juanchito.jpeg';
let covid = new Image();
covid.src = './images/covid.png';
//This is our car'
var car = {
  //This is your car object
  x: canvas.width / 2 - 25,
  y: 500,
  w: 50,
  h: 50,
  image: carImg,
};

var covids = {
  x: 50,
  y: -7000,
  w: 500,
  h: 600,
  image: covid,
};

let arrObs = [
  (obs1 = {
    x: 76,
    y: 30,
    w: 250,
    h: 30,
  }),
  (obs2 = {
    x: 325,
    y: 150,
    w: 200,
    h: 30,
  }),
  (obs3 = {
    x: 325,
    y: -150,
    w: 200,
    h: 30,
  }),
];

const createObstacle = (obs, i) => {
  return ctx.fillRect(obs.x, (obs.y += i), obs.w, obs.h);
};

function firstObstacle(i, obstacle) {
  ctx.fillStyle = 'purple';
  createObstacle(obstacle, i);
  ctx.drawImage(niko, obs1.x - 80, obs1.y - 30, 80, 100);
}

function secondObstacle(i, obstacle) {
  ctx.fillStyle = 'red';
  createObstacle(obstacle, i);
  ctx.drawImage(stefan, obs2.x + 195, obs2.y - 30, 80, 100);
}

function thirdObstacle(i, obstacle) {
  ctx.fillStyle = 'blue';
  createObstacle(obstacle, i);
  ctx.drawImage(juanchito, obs3.x + 195, obs3.y - 30, 80, 100);
}

function boyCovid(i) {
  ctx.drawImage(covid, covids.x, (covids.y += 10), covids.w, covids.h);
}

function drawCar() {
  ctx.drawImage(car.image, car.x, car.y, car.w, car.h);
}

function drawBoard() {
  ctx.drawImage(boardImg, 0, 0, 600, 600);
}

// DETECT COLLISION CODE
function detectCollision(obs) {
  obs.map((obj) => {
    var a = { x: obj.x, y: obj.y, width: obj.w, height: obj.h }; //Our obstacles
    var b = { x: car.x, y: car.y, width: car.w, height: car.h }; //Our car
    if (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    ) {
      // collision detected!
      console.log(' the rectangles colided');
    }
  });
}

function covidCollision(virus){
  var a = { x: virus.x, y: virus.y, width: virus.w, height: virus.h-20 }; //Our obstacles
  var b = { x: car.x, y: car.y, width: car.w, height: car.h }; //Our car
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    // collision detected!
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    alert("Ooopsss... covid got ya buddy!")
    requestAnimationFrame.cancelAnimationFrame(startGame)
  }
}

//CAR MOVEMENT

function detectMove() {
  document.body.onkeydown = function (e) {
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

let z = 0;
let score = 0;
function startGame() {
  z++;
  let i = 0;
  i += 1;

  if (z % 100 === 0) {
    score += 1;
    document.getElementById('score').innerText = `Score:${score}`;
  }

  document.getElementsByClassName('game-intro')[0].style.display = 'none';
  drawBoard();
  drawCar();
  boyCovid(i);
  firstObstacle(i, arrObs[0]);
  secondObstacle(i, arrObs[1]);
  thirdObstacle(i, arrObs[2]);
  detectCollision(arrObs);

  covidCollision(covids)

  animateId = window.requestAnimationFrame(startGame); //Game rendering -infinite loop that goes super fast
}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
    detectMove();
  };
};
