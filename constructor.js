var jack;
var bg;
var canvasWidth = 1400;
var canvasHeight = 640;
var rightPressed = false;
var leftPressed = false;
var boosterPressed = false;
var onGround = true;
var pressingI = false;
var pressingO = false;
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
var gameState = "startMenu";
var rect;
var bgMusic = new Audio('BOAction.mp3');
var firstBetty = false;
var date1;
var stateText;
var pressESC;
var desc;
var info = "Earth is no more...\nwe the people escaped before the inevetable to a planet outside the galaxay.\nThe Americans shattered our dreams and hopes of a sustainable future on Earth.\nThey drove mother Earth to it's limits.\nNow that they've found us, a trail of death and devastation is upon us.\nHowever we know their weakness...\nThey cannot resist fatty food and we have an limitless supply of deep-fried fries.\nYou're our best soldier, shower the Americans in what they crave\nVictory shall be ours!";
var pauseInfo = "Controlls:\nMove with [A] and [D]\n[K] - Shoot\n[Spacebar] - Jump\nUpgrades:\n[I] - Increase shoot speed\n[O] - Clears Americans off floor\nTip: Remember that you can buy upgrades or clear bottom floor with DB\nDB hearts stands for diabetes hearts and it's a common curency here\ngained from killing Americans; they truly are something special.";
var money = 0;
var displayMnScr;
var score = 0;
var displayScore;
var spawnrate = 4;
var clearFloor;
var clearFloorText;
var clearFloorCost = 30;
var doubleTap;
var doubleTapText;
var doubleTapCost = 10;
var onlyBuyOnce = true;
var firerate = 0.7;
var mcSpecialCost = 75;
var mcSpecialText;
var mcSpecial;
var extraLives = 3;

function initiateValues() {
  money = 0;
  score = 0;
  spawnrate = 4;
  clearFloorCost = 30;
  doubleTapCost = 10;
  onlyBuyOnce = true;
  firerate = 0.7;
  mcSpecialCost = 75;
  extraLives = 3;
  firstBetty = false;
  spawnBettyCountdown = true;
  reasignMnScr();
  doubleTap.update();
  doubleTapText.update();
  doubleTapText.text = "[I]\nDouble Tap\n"+doubleTapCost+" DB";
  clearFloorText.text = "[O]\nClear Floor\n"+clearFloorCost+" DB";
}
function startGame() {
    jack = new component(70, 114, "jack.png",(canvasWidth/2)-35 ,canvasHeight-114, "image");
    bg = new component(canvasWidth, canvasHeight, "bakgrund.png",0,0, "image");
    nugget = new component(100, 100, "nugget.png",100,0, "image");
    deathAnimation = new component(200, 170, "deathAn.png", 0, 0, "image");
    clearFloor = new component(50,50, "BettyRedCircle.png", canvasWidth - 100, canvasHeight-100, "image");
    doubleTap = new component(50, 50, "friesBadge.png", canvasWidth-100, canvasHeight-200, "image");
    rect = new component(2000, 1700, "black", 0,0);
    stateText = new component("64px cod","Start Mission", "white", canvasWidth/2 ,100, "text");
    stateText.textAlign = "center";
    pressESC = new component("32px cod","Press ESC to play", "white",10,canvasHeight-10,"text");
    pressESC.textAlign = "left";
    desc = new component("24px brodtext", info, "white", 30, 150, "text");
    desc.textAlign = "left";
    desc.offsetSpace = 20;
    displayMnScr = new component("32px cod", "Score: "+score+"\nDB hearts: "+money+"\nExtra Lives: "+extraLives, "white", 10, 40, "text");
    displayMnScr.textAlign = "left";
    clearFloorText = new component("16px brodtext", "[O]\nClear Floor\n"+clearFloorCost+" DB", "white", canvasWidth - 75, canvasHeight-35, "text");
    clearFloorText.textAlign = "center";
    doubleTapText = new component("16px brodtext", "[I]\nDouble Tap\n"+doubleTapCost+" DB", "white", canvasWidth - 75, canvasHeight-135, "text");
    doubleTapText.textAlign = "center";
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
function reasignMnScr() {
  displayMnScr.text = "Score: "+score+"\nDB hearts: "+money+"\nExtra Lives: "+extraLives;
}
function difficulty() {
  if (score == 0) {
    spawnrate = 4;
  } else if (score <21) {
    spawnrate *= 0.993;
  } else if (score > 21 && score < 41) {
    spawnrate *= 0.98;
  } else if (score > 99 && score < 155) {
    spawnrate = 2;
  } else if (score >= 155){
    spawnrate = 0.5;
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
          if (e.keyCode == 65){
            leftPressed = true;
          }
          if (e.keyCode == 68) {
            rightPressed = true;
          }
          if (e.keyCode == 32) {
            boosterPressed = true;
          }
          if (e.keyCode == 75) {
            shootingPressed = true;
          }
          if (e.keyCode == 82){
            if (gameState == "Gameover"){
              gameState = "startMenu";
              initiateValues();
            }
          }
          if (e.keyCode == 27) { //Klicka esc för att pausa om man spelar eller starta igen om man är pausad
            if (gameState == "playing") {
              gameState = "paused";
              stateText.text = "Game Paused";
              pressESC.text = "Press ESC to continue";
            } else if (gameState == "paused") {
              gameState = "playing";
            } else if (gameState == "startMenu") {
              gameState = "playing";
            }
          }
          if (e.keyCode == 73) { // i klickades
          pressingI = true;
          }
          if (e.keyCode == 79) {//o klickades
          pressingO = true;
          }
        });
        window.addEventListener('keyup', function (e) {
          if (e.keyCode == 65){
            leftPressed = false;
          }
          if (e.keyCode == 68) {
            rightPressed = false;
          }
          if (e.keyCode == 32) {
            boosterPressed = false;
          }
          if (e.keyCode == 75) {
            shootingPressed = false;
          }
          if (e.keyCode == 73) { // i släpptes
          pressingI = false;
          onlyBuyOnce = true;
          }
          if (e.keyCode == 79) {//o släpptes
          pressingO = false;
          onlyBuyOnce = true;
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
    this.text = height;
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
        if (this.type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else if (this.type == "text") {
          ctx.font = this.width;
          ctx.textAlign = this.textAlign;
          ctx.fillStyle = color;
          if(height.includes("\n")) {
            this.y = y;
            this.text2 = this.text.split("\n");
            this.verticalSpace = this.width.split("px "); //dehär bestämmer hur mkt den ska gå nedåt sen och eftersom jag splitar vid "px " kmr [0] vara X alltså storleken i pixlar fast som en string så de mst göras om till en int för att använda
            for (var i = 0; i < this.text2.length; i++) {
              ctx.fillText(this.text2[i], this.x, this.y);
              if (this.offsetSpace !== undefined) { //detta kollar om det finns en offsetSpace definerad vilket ska göra radasvtåndet större för estetiska själ
                this.y += (parseInt(this.verticalSpace[0]) + this.offsetSpace); //parseInt() gör en string till int
              } else {
                this.y += (parseInt(this.verticalSpace[0])); //om det inte finns en offsetSpace ska den skrivas precis under sig själv
              }
            }
          } else {
            ctx.fillText(this.text, this.x, this.y);
          }
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
        if (this.direction == 1){
          this.x = rightEdge;
        } else {
          this.direction = 1;
          this.x = rightEdge;
          this.y += this.height;
        }
      }
      if (this.x < leftEdge) {
        if (this.direction == 0) {
          this.x = leftEdge;
        } else {
          this.x = leftEdge;
          this.direction = 0;
          this.y += this.height;
        }
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
      } else return false;
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
          bgMusic.currentTime = 0;
          date1 = (Date.now() + (13.8 * 1000)); //dehär är för att tajma beatet med den första spawnade betty fungerar endast om det inte pausas innan den första spawnar
        }
        bgMusic.play();
      }
      myGameArea.clear();
      bg.update();
      fries();
      displayMnScr.update();
      clearFloor.update();
      clearFloorText.update();
      doubleTap.update();
      doubleTapText.update();
      bettys();
      jack.newPos();
      jack.update();
      jackMovement();
      powerUps();
      //deathAnimation.update();
    break;

    case "startMenu":
    stateText.text = "Start Mission";
    desc.text = info;
    if (!bgMusic.paused) {
      bgMusic.pause();
    }
    myGameArea.clear();
    rect.update();
    stateText.update();
    pressESC.update();
    desc.update();
    for (i = 0; i < desc.length; i += 1) {
      desc[i].update();
    }

      break;
      case "paused":
      if (!bgMusic.paused) {
        bgMusic.pause();
      }
      desc.text = pauseInfo;
      rect.update();
      stateText.update();
      pressESC.update();
      displayMnScr.update();
      desc.update();
      break;

      case "Gameover":
      if (!bgMusic.paused) {
        bgMusic.pause();
      }
      desc.text = "\nYour score was: "+score+". \n\nThe Americans won this war, maybe it's possible to try again... \n\n[R] - To restart";
      rect.update();
      stateText.text = "Game Over";
      stateText.update();
      desc.update();
      break;
  }
}
