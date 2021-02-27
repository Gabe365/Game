  function bettys(){

    if(sleep(4, "spawnBettyCountdown")){
        betty.push(new component(136, 127, "Betty.png", 1, 0, "image"));
        betty[betty.length-1].direction = 0; //gör att den senast skapade alltid börjar åka åt höger
        betty[betty.length-1].hits = 0;
      }

    for (i = 0; i < betty.length; i += 1) {
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
           console.log("Jack nuddar betty");
              }
          }
  }
