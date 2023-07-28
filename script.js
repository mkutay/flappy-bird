let bird;
let game = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGame, 16);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};
let obstacles = [];
let score = 0;

function component(width, height, color, x, y, type) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.gravity = 0;
  this.gravitySpeed = 0;
  this.update = function() {
    let ctx = game.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;

    if (this.y + this.height >= game.canvas.height) {
      this.y = game.canvas.height - this.height;
      this.gravitySpeed = 0;
    }

    if (this.y <= 0) {
      this.y = 0;
      this.gravitySpeed = 0;
    }
  };
  this.collision = function(obj) {
    if (this.y + this.height < obj.y || this.y > obj.y + obj.height || this.x + this.width < obj.x || this.x > obj.x + obj.width) {
      return false;
    }
    return true;
  }
}

function startGame() {
  acc.style.display = "block";
  rest.style.display = "block";
  bird = new component(30, 30, "#f38ba8", 10, 120);
  bird.gravity = 0.05;
  obstacles = [];
  game.start();
}

function updateGame() {
  score = 0;
  for (let i = 0; i < obstacles.length; i++) {
    if (bird.collision(obstacles[i])) {
      return;
    }
    if (obstacles[i].x <= bird.x) {
      score++;
    }
  }
  game.clear();
  game.frameNo++;
  if (game.frameNo == 1 || game.frameNo % 150 == 0) {
    x = game.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

    obstacles.push(new component(15, height, "#a6e3a1", x, 0));
    obstacles.push(new component(15, x - height - gap, "#a6e3a1", x, height + gap));
  }

  obstacles.forEach((obstacle) => {
    obstacle.x -= 1;
    obstacle.update();
    console.log(obstacle);
  });

  bird.newPos();
  bird.update();

  document.getElementById("sco").innerText = score / 2;
}

function accf(a) {
  bird.gravity = a;
}

function restartGame() {
  startGame();
}