//champ de texte pseudo
function getPseudo(){
let psdo = document.getElementById('pseudoquery').value;
let psdo2 = document.getElementById('pseudoquery2').value;
//console.log("Votre pseudo : " + pseudo);

  let pdo = {j1 : psdo, j2 : psdo2};
return pdo;
}

//Bouton start qui déclenche createPlateauButtons en dessous et récupère le pseudo
let startbutton = document.createElement("button")
startbutton.innerHTML = "Start game !"
document.body.appendChild(startbutton);
startbutton.addEventListener("click",LaunchingGame);
startbutton.onclick = getPseudo;

function LaunchingGame(){
  startbutton.remove(); // Supprime le bouton start game au lancement de la partie
  console.log("Pseudo du joueur 1 : " + getPseudo().j1);
  console.log("Pseudo du joueur 2 : " + getPseudo().j2);
  let champpsdo = document.getElementById('pseudoquery');
  let champpsdo2 = document.getElementById('pseudoquery2');
  //champpsdo.remove();// suppr le champ saisie pseudo
  //champpsdo2.remove();// suppr le champ saisie pseudo

  //Appel fonction qui affiche les pions des joueurs :
  genPionsButtons();
  AttachEvent(plateau);
  createPlateauButtons();
}

//crée boutons 1 ou 0 en fonction du plateau créé (classPlateau.js)
function createPlateauButtons() {
  let divplateau = document.getElementById('plateauJeu');
  for (let i = 0 ; i < 10 ; i++){
    for (let j = 0 ; j < 10 ; j++ ){

      if(plateau.plateau[i][j]==1){ // Si case du plateau = 1
        let butn = document.createElement("button");
        butn.className = "BoutonDuPlateau";
        if(i==0){
        butn.setAttribute('id',j)
      }
        else{
          butn.setAttribute('id',i+''+j)
        }
        butn.innerHTML =1;
        divplateau.appendChild(butn);
      }

      if (plateau.plateau[i][j]==0){ // Si case du plateau = 0 (lac)
        let butnlac = document.createElement("button");
        butnlac.className = "BoutonDuPlateau";
        butnlac.setAttribute('id',i+''+j);
        butnlac.innerHTML = "0";
        divplateau.appendChild(butnlac);
      }

/*
      else if(plateau.plateau[i][j]!=0 && plateau.plateau[i][j]!=1){
        let butnn = document.createElement("button");

        //Nom du pion à afficher sur le plateau avec sa couleur:
        let strColor = boutonJoueuraPlacer.name.fontcolor(color);
        butnn.className = "BoutonDuPlateau";

        if(iP==0){
        butnn.setAttribute('id',jP);
        }
        else{
          butnn.setAttribute('id',iP+''+jP)
        }

        butnn.innerHTML = strColor;
        butnn.style.color = color;
        divplateau.appendChild(butnn);

        //Supprimer le bouton Pion placé dans la liste du joueur :
        //boutonJoueuraPlacer.remove();

      }*/

    }
    divplateau.appendChild(document.createElement('br')); // retours à la ligne
  }
}

//Lancement de la game, se finit lorsque le drapeau est capturé
function PlayerTurn(Player1, Player2) {

  let username_j1 = getPseudo().j1;a
  let username_j2 = getPseudo().j2;
  let winner;
  let isfinished = false;
  let turncount = 0;

  console.log("PlayerTurn() appelé");

  while (isfinished!=true){

    if(PlayerRed.pionsJoueur[33].isTaken()==true){
      isfinished = true;
      winner = username_j1;
    }
    else if(PlayerBlue.pionsJoueur[33].isTaken()==true){
      isfinished = true;
      winner = username_j2;
    }
    // Tour du j1
    else if(turncount % 2 == 0){
      console.log("Player 1");

      turncount++;
    }
    // Tour du j2
    else if(turncount % 2 == 1){
      console.log("Player 2;")

      turncount++;
    }
  }
}
