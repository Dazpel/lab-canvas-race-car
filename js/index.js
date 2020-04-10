const canvas = document.getElementById('canvas');
canvas.width = 600;
canvas.height = 600;

const ctx = canvas.getContext('2d');
let animateId = null;

const tracker = (message) => {
  var list = document.getElementById('tracker');
  let newItem = `<li>${message}</li>`;
  list.insertAdjacentHTML('beforeend', newItem);
};

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
let react = new Image();
react.src = './images/react.png';
let css = new Image();
css.src = './images/css.png';
let js = new Image();
js.src = './images/js.png';
let covid = new Image();
covid.src = './images/covid.png';
//This is our car'
var car = {
  //This is your car object
  x: canvas.width / 2 - 25,
  y: 540,
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
    name: 'Nico',
    x: 76,
    y: -560,
    w: 100,
    h: 100,
    image: niko,
  }),
  (obs2 = {
    name: 'Stefan',
    x: 140,
    y: -765,
    w: 100,
    h: 100,
    image: stefan,
  }),
  (obs3 = {
    name: 'Juanchito',
    x: 210,
    y: -960,
    w: 100,
    h: 100,
    image: juanchito,
  }),
  (obs4 = {
    name: 'React',
    x: 280,
    y: -1160,
    w: 100,
    h: 100,
    image: react,
  }),
  (obs3 = {
    name: 'Css',
    x: 350,
    y: -1360,
    w: 100,
    h: 100,
    image: css,
  }),
  (obs3 = {
    name: 'Javascript',
    x: 420,
    y: -1560,
    w: 100,
    h: 100,
    image: js,
  }),
];

const createObstacle = (obs, i) => {
  let rX = Math.floor(Math.random() * (430 - 76) + 76);
  if (obs.y > 610) {
    obs.y = -150;
    obs.x = rX;
  }

  ctx.drawImage(obs.image, obs.x, (obs.y += i), obs.w, obs.h);
};

function boyCovid(isTime) {
  
  if (isTime > 12) {
    ctx.drawImage(covid, covids.x, (covids.y += 10), covids.w, covids.h);
  }
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
      obj.y = -Math.floor(Math.random() * (250 - 150) + 150);
      obj.x = Math.floor(Math.random() * (430 - 76) + 76);
      tracker(`Collided with ${obj.name}`);
    }
  });
}

function covidCollision(virus) {
  
  var a = { x: virus.x, y: virus.y, width: virus.w, height: virus.h - 20 }; //Our obstacles
  var b = { x: car.x, y: car.y, width: car.w, height: car.h }; //Our car
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    // collision detected!
    document.getElementById('boss').pause();

    document.getElementById('collision').play();
    tracker(`You cannot scape the Rona...`);
    setTimeout(() => {
      location.reload();
    }, 3600);
    window.cancelAnimationFrame();
  }
}

//CAR MOVEMENT

function detectMove() {
  document.body.onkeydown = function (e) {
    switch (e.keyCode) {
      case 38:
      case 40:
        e.preventDefault();
        break;
      case 37:
        car.x === 75 ? tracker(`Cannot leave the road dummy!`) : (car.x -= 20);
        break;

      case 39:
        car.x === 475 ? tracker(`Cannot leave the road dummy!`) : (car.x += 20);
        break;
      default:
        break;
    }
  };
}

let z = 0;
var score = 0;

function startGame() {
  z++;
  let i = 0;
  i += 2;

  if (z % 100 === 0) {
    score += 1;
    document.getElementById('score').innerText = `Score:${score}`;
  }
  
  document.getElementsByClassName('game-intro')[0].style.display = 'none';
  document.getElementById('game-board').style.display = 'grid';

  drawBoard();
  drawCar();
  arrObs.map((x) => createObstacle(x, i));
  detectCollision(arrObs);

  
  boyCovid(score);
  covidCollision(covids);

  animateId = window.requestAnimationFrame(startGame); //Game rendering -infinite loop that goes super fast
}

window.onload = () => {
  alert('Lower your volume, the game contains music... also... Wait till the score reaches 12. for a bonus :)')
  document.getElementById('start').play();
  document.getElementById('game-board').style.display = 'none';
  document.getElementById('start-button').onclick = () => {
   
    setTimeout(() => {
      tracker(`SOMETHING IS COMING! BEWARE!`)
      document.getElementById('playing').pause();
      document.getElementById('boss').play();
    }, 20000);
    startGame();
    document.getElementById('start').pause();
  document.getElementById('playing').play();
    detectMove();
  };
};
