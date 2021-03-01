var jack;
var bg;
//var speed = 0;
var canvasWidth = 1400;
var canvasHeight = 640;
var rightPressed = false;
var leftPressed = false;
var boosterPressed = false;
var onGround = true;
var nuggetDirection = Math.floor(Math.random() * 2);
var americanDirection = Math.floor(Math.random() * 2); //gör detta när skapas
var betty = [];
var spawnBettyCountdown = true;
var timeBetty = null;
var timeShot = null;
var frie = [];
var shootingPressed = false;
var shootCountdown = false;
var deathAnimation;
var hitSound = new Audio('eat.mp3');
var deathSound = new Audio('deathsSound.mp3');
var gameState = "paused";
var rect;
var bgMusic = new Audio('BOAction.mp3');
var firstBetty = false;
var date1;

function startGame() {
    jack = new component(70, 114, "jack.png",(canvasWidth/2)-35 ,canvasHeight-114, "image");
    bg = new component(canvasWidth, canvasHeight, "bakgrund.png",0,0, "image");
    nugget = new component(100, 100, "nugget.png",100,0, "image");
    deathAnimation = new component(200, 170, "deathAn.png", 0, 0, "image");
    rect = new component(2000,1700, "white", 0,0);
    myGameArea.start();

}
function sleep(seconds, countdown) {
switch (countdown) {
  case "spawnBettyCountdown":
    if (firstBetty) {
      if (spawnBettyCountdown == true) {
        spawnBettyCountdown = false;
        return true;
      } else if (timeBetty == null) {
        timeBetty = (Date.now() + (seconds * 1000));
        return false;
      } else if (timeBetty !== null) {
        if (timeBetty < Date.now()) {
          spawnBettyCountdown = true;
          timeBetty = null;
          return false;
          }
        }
    }

    break;
  case "shootCountdown":
    if (shootCountdown == true) {
      shootCountdown = false;
      return true;
    } else if (timeShot == null) {
      timeShot = (Date.now() + (seconds * 1000));
      return false;
    } else if (timeShot !== null) {
      if (timeShot < Date.now()) {
        shootCountdown = true;
        timeShot = null;
        return false;
        }
      }
    break;
    case "timer":
      var date2 = new Date();
      var diff = date2 - date1;
      if (diff > 0) {
        return true;
      } else {
        return false;
      }
    break;
}
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

        window.addEventListener('keydown', function (e) {
          if (e.key == "a"){
            leftPressed = true;
          }
          if (e.key == "d") {
            rightPressed = true;
          }
          if (e.keyCode == 32) {
            boosterPressed = true;
          }
          if (e.key == "k") {
            shootingPressed = true;
          }
          if (e.keyCode == 27) { //Klicka esc för att pausa om man spelar eller starta igen om man är pausad
            if (gameState == "playing") {
              gameState = "paused";
            } else if (gameState == "paused") {
              gameState = "playing";
            }
          }
        });
        window.addEventListener('keyup', function (e) {
          if (e.key == "a"){
            leftPressed = false;
          }
          if (e.key == "d") {
            rightPressed = false;
          }
          if (e.keyCode == 32) {
            boosterPressed = false;
          }
          if (e.key == "k") {
            shootingPressed = false;
          }
        });

        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
};

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.215;
    this.gravitySpeed = 0;
    this.x = x;
    this.y = y;

    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);

        }
    };
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        if (boosterPressed == true){
          this.y += this.speedY + this.gravitySpeed;
        }
        else if (boosterPressed == false) {
          this.y += this.speedY + this.gravitySpeed;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        this.hitBottom();
        this.hitEdge();
        this.hitBottomAmericans();
    };

    this.newPosBetty = function() {
      this.x += this.speedX;
      this.y -= this.speedY;
      this.turnAtEdge();
      this.hitBottomAmericans();
    };

    this.powerUps = function() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.hitBottom();
      this.hitEdge();

    };

    this.hitBottom = function() {
      var bottom = myGameArea.canvas.height - this.height;
      if (this.y > bottom) {
        this.y = bottom;
        this.gravitySpeed = 0;
        this.speedY = 0;
      }
    };
    this.hitBottomAmericans = function() {
      var bottom = myGameArea.canvas.height - this.height;
      if (this.y > bottom) {
        this.y = bottom;
      }
    };

    this.turnAtEdge = function() {
      var rightEdge = myGameArea.canvas.width - this.width;
      var leftEdge = 0;
      if (this.x > rightEdge) {
        this.direction = 1;
        this.x = (rightEdge - this.width);
        this.y += this.height;
      }
      if (this.x < leftEdge) {
        this.x = leftEdge;
        this.direction = 0;
        this.y += this.height;
      }
    };
    this.hitEdge = function() {
      var rightEdge = myGameArea.canvas.width - this.width;
      var leftEdge = 0;
      if (this.x > rightEdge) {
        this.x = rightEdge;
        this.speedX = 0;
      }
      if (this.x < leftEdge) {
        this.x = leftEdge;
        this.speedX = 0;
      }
    };

    this.hit = function(entity2){

      var entity2Left = (entity2.x);
      var entity2Right = (entity2.x + entity2.width); //Användningen av denna funktionen kommer vara att ses om 2 föremål nuddar varann, så därför ändrade jag från hard coda in bara betty och jack
      var entity2Top = (entity2.y);                   // Till att använda mig av this. då en av de man jämför med kan man ersätta this med och den andra får man fån parametern "entity2"
      var entity2Bottom = (entity2.y + entity2.height); //Eftersom att allt skapat i constructorn redan har en width och height fungerar det lika bra.
      var thisLeft = (this.x);
      var thisRight = (this.x + this.width);
      var thisTop = (this.y);
      var thisBottom = (this.y + this.height);
      if ((((entity2Left <= thisLeft) && (entity2Right >= thisRight)) || ((entity2Right >= thisLeft) && (entity2Right <= thisRight) || ((entity2Left <= thisRight) && (entity2Left >= thisLeft)))) &&
       ((entity2Top <= thisTop) && ((entity2Bottom >= thisBottom)) || (((entity2Bottom >= thisBottom) && (entity2Bottom <= thisTop)) || ((entity2Top >= thisTop) && (entity2Top <= thisBottom))))){
        return true;
      }
    };

    this.nrHits = function(health) {
      if (this.hits < health) {
        this.hits++;
        return false;
      } else if (this.hits >= health) {
        return true;
      }
    };


}

function updateGameArea() {
  switch (gameState) {
    case "playing":
      if (bgMusic.paused) {
        if (!firstBetty) {
          date1 = (Date.now() + (14 * 1000));
        }
        bgMusic.play();
        console.log(date1);
      }
      myGameArea.clear();
      bg.update();
      //nugget.update();
      fries();
      bettys();
      jack.newPos();
      jack.update();
      jackMovement();
      //deathAnimation.update();
    break;

    case "paused":
    if (!bgMusic.paused) {
      bgMusic.pause();
    }
    myGameArea.clear();
    rect.update();
      break;
  }
}
