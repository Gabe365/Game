function fries() {
  if (shootingPressed) {
    if (sleep(0.5, "shootCountdown")) {
      frie.push(new component(5, 36.5, "fries.png", (jack.x + jack.width/2), jack.y, "image" ));
      frie[frie.length-1].speedY = 20;
    }
  }

  for (i = 0; i < frie.length; i += 1) {
    frie[i].update();
    frie[i].newPosBetty();
    for (g = 0; g < betty.length; g += 1) {
      if (frie[i].hit(betty[g])) {
        if (betty[g].nrHits(3) == false) {
          betty[g].width *= 1.15;
          hitSound.play();
          frie.splice(i, 1);
        } else if (betty[g].nrHits(4)) {
            frie.splice(i, 1);
            deathAnimation.x = betty[g].x;
            deathAnimation.y = betty[g].y;
            betty.splice(g, 1);
            deathSound.play();
            deathAnimation.update();
            money++;
            score++;
            reasignMnScr();
        }
      }
    }
  }
  if (frie.length > 0) { //denna if satsen tar bort alla skott som har kommuit utanför skärmen med 100 units, och eftersom att den körs hela tiden räcker det att jag kollar på det tidigast skapade nuvarande frie eftersom den är den som kommit längst
    if (frie[0].y < -100 ) {
      frie.shift(); //shift(); tar bort index[0] och sedan skiftar alla andra så att om det fanns en index[1] skulle den nu vara index[0]
    }
  }

}
