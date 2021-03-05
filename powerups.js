function powerUps() {
  if (pressingI && money >= doubleTapCost && onlyBuyOnce && firerate > 0.39) {
    money -= doubleTapCost;
    firerate -= 0.05;
    doubleTapCost = Math.round(doubleTapCost*1.2);
    doubleTapText.text = "[I]\nDouble Tap\n"+doubleTapCost+" DB";
    reasignMnScr();
    onlyBuyOnce = false;
  } else if (pressingO && money >= clearFloorCost && onlyBuyOnce) { //denna poweruppen är för att köpa bort alla betty som är på de två lägsta nivåerna
      money -= clearFloorCost;
      clearFloorCost = Math.round(clearFloorCost*1.2);
      clearFloorText.text = "[O]\nClear Floor\n"+clearFloorCost+" DB";
      for (i = 0; i < betty.length; i++) { //en for loop för att kolla igenom alla betty
        if (betty[i].y > 380) { //Räknade ut att om hon är under 380 så är hon på botten 2 raderna som denna uppgraderingen ska ta bort
          deathAnimation.x = betty[i].x;
          deathAnimation.y = betty[i].y;
          betty.splice(i, 1);
          deathSound.play();
          deathAnimation.update();
          i=-1;//detta gör jag för att efter man splicat så skiftar alla så om ngt var [1] och så togs [0] bort blir den tidigare [1] ---> [0]
          //jag sätter i=-1 för att for loopen lägger till en så om jag sätter den till 0 kommer for loopen göra den till 1 innan den skannar första gången
          money++;
          score++;
        }
      }
      reasignMnScr();
      onlyBuyOnce = false;
    }
}
