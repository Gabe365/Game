  function bettys(){
    if (!firstBetty && sleep(0,"timer")) {
      spawnBettyCountdown = true;
      firstBetty = true;
    }
    if(sleep(spawnrate, "spawnBettyCountdown")){
        betty.push(new component(136, 127, "Betty.png", 1, 0, "image"));
        betty[betty.length-1].direction = 0; //gör att den senast skapade alltid börjar åka åt höger
        betty[betty.length-1].hits = 0;
      }

    for (i = 0; i < betty.length; i++) {
          betty[i].newPosBetty();
          betty[i].update();
          betty[i].turnAtEdge();
          switch (betty[i].direction) {
            case 0:
              betty[i].speedX = 4;
              betty[i].image.src = "Betty.png";
              break;

            case 1:
              betty[i].speedX = -4;
              betty[i].image.src = "BettyFlipped.png";
              break;
            default:
            }


               if (betty[i].hit(jack)) {
                 extraLives--;
                 reasignMnScr();
                 deathAnimation.x = betty[i].x;
                 deathAnimation.y = betty[i].y;
                 betty.splice(i, 1);
                 deathSound.play();
                 if (extraLives < 0) {
                   betty.splice(0, betty.length+1);
                   gameState = "Gameover";
                   extraLives = 3;
                 }
              }
          }
  }
