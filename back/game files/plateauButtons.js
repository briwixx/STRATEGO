
let plateauHTML = document.getElementById('plateauJeu');

//crée boutons + ou - en fonction du plateau créé (classPlateau.js)
function createPlateauButtons() {
  for (let i = 0 ; i < 10 ; i++){
    for (let j = 0 ; j < 10 ; j++ ){

      if(true){ // Si case du plateau = 1
        let butn = document.createElement("button");
        butn.innerHTML = "+";
        document.body.appendChild(butn);
        //rajouter classe BoutonDuPlateau aux boutons
      }

      else if (false){ // Si case du plateau = 0
        let butn = document.createElement("button");
        butn.innerHTML = "-";
        document.body.appendChild(butn);
        //rajouter classe BoutonDuPlateau aux boutons
      }

    }
  }
}

//Bouton start qui declenche la fonction au dessus
let startbutton = document.createElement("button")
startbutton.innerHTML = "Start game !"
document.body.appendChild(startbutton);
startbutton.addEventListener("click",createPlateauButtons);

//Lancement de la game, se finit lorsque le drapeau est capturé
function PlayerTurn() {
  let isfinished = false;
  let turncount = 0;

  while (isfinished==false){
    turncount++;
    console.log(turncount);
    if(PlayerRed.pionsJoueur[33].isTaken()==true || PlayerBlue.pionsJoueur[33].isTaken()==true){
      isfinished = true;
    }
    else {
      turncount++;
      console.log(turncount);
    }
  }
}

let launchgame = document.getElementsByClassName('BoutonDuPlateau');
launchgame.addEventListener("click",PlayerTurn);
