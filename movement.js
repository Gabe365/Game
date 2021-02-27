function jackMovement() {
  jack.speedY = 0;

  if(leftPressed == true){
      jack.speedX = -8;
    }
  if(rightPressed == true){
      jack.speedX = 8;
      
    }

  if (rightPressed == false && leftPressed == false) {
    jack.speedX = 0;
  }
  if (boosterPressed == true || canvasHeight == jack.y) {
    speed = -4;
    jack.speedY = speed;
}
}

function nuggetMovement() {

  switch (nuggetDirection) {
    case 0:
      nugget.speedX = 4;
      break;

    case 1:
    nugget.speedX = -4;
      break;
    default:
  }
}
