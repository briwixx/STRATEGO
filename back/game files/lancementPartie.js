//champ de texte pseudo
function getPseudo(){
let psdo = document.getElementById('pseudoquery').value;
//console.log("Votre pseudo : " + pseudo);
return psdo;
}

//Bouton start qui declenche la fonction en dessous et récupère le pseudo
let startbutton = document.createElement("button")
startbutton.innerHTML = "Start game !"
document.body.appendChild(startbutton);
startbutton.addEventListener("click",createPlateauButtons);
startbutton.onclick = getPseudo;

//crée boutons + ou - en fonction du plateau créé (classPlateau.js)
function createPlateauButtons() {
  startbutton.remove(); // Supprime le bouton start game au lancement de la partie
  let divplateau = document.getElementById('plateauJeu'); //Place le plateau dans la divplateau
  for (let i = 0 ; i < 10 ; i++){
    for (let j = 0 ; j < 10 ; j++ ){

      if(plateau.plateau[i][j]==1){ // Si case du plateau = 1
        let butn = document.createElement("button");
        butn.className = "BoutonDuPlateau";
        butn.innerHTML = "1";
        divplateau.appendChild(butn);
      }

      else if (plateau.plateau[i][j]==0){ // Si case du plateau = 0 (lac)
        let butnlac = document.createElement("button");
        butnlac.className = "BoutonDuPlateau";
        butnlac.innerHTML = "0";
        divplateau.appendChild(butnlac);
      }

    }
    divplateau.appendChild(document.createElement('br')); // retours à la ligne
  }

/*
Fait buguer le navigateur :
  let launchgame = document.getElementsByClassName('BoutonDuPlateau');
  console.log(launchgame);

  for (var i = 0; i < 10; i++) {
    launchgame[i].addEventListener("click",PlayerTurn());
  }
  */
}

//Lancement de la game, se finit lorsque le drapeau est capturé
function PlayerTurn() {
  let username = getPseudo();

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
