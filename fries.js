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
          console.log(betty[g].hits);
          betty[g].width *= 1.15;
          //betty[g].height *= 1.05;
          hitSound.play();
          frie.splice(i, 1);
          console.log(frie);
        } else if (betty[g].nrHits(4)) {
            frie.splice(i, 1);
            deathAnimation.x = betty[g].x;
            deathAnimation.y = betty[g].y;
            betty.splice(g, 1);
            deathSound.play();
            deathAnimation.update();
        }
      }
    }
  }
  if (frie.length > 0) {
    if (frie[0].y < -100 ) {
      frie.shift();
      console.log(frie.length);
    }
  }

}
