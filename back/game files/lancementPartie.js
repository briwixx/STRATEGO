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

    }
    divplateau.appendChild(document.createElement('br')); // retours à la ligne
  }
}

//Lancement de la game, se finit lorsque le drapeau est capturé
function PlayerTurn(Player,color) {
  alert("C'est au joueur " + color + "de jouer");

  let username_j1 = Player.getPseudo();
  //let username_j2 = Player2.getPseudo();
  let winner;
  let turnIsFinished = false;
  let gameIsFinished = false;
  let turncount = 0;

// Afficher tab placer bon event
  if (gameIsFinished!=true){
    if(turnIsFinished != true){
      if(PlayerRed.pionsJoueur[33].isTaken()==true){
        gameIsFinished = true;
        winner = username_j1;
      }
      else if(PlayerBlue.pionsJoueur[33].isTaken()==true){
        gameIsFinished = true;
        winner = username_j2;
      }

      //GET LE PION A FAIRE AVANCER
      let pion = 0;

      //Recursivité en fonction du joueur qui joue
      if(color =='blue'){
        HideOponent('red');
        pion.Avancer();
        PlayerTurn(PlayerRed,'red');

      }
      else if (color == 'red') {
        HideOponent('blue');
        pion.Avancer();
        PlayerTurn(PlayerBlue,'blue');
      }

    }
  }
  else{
    console.log("Partie terminée");
  }


}


function HideOponent(color){
  // Je récupère tous les boutons du plateau, j'assigne les 40 premiers au rouge, et les 40 derniers au bleu
  let btnPlateau = document.getElementsByClassName("BoutonDuPlateau");
  let redBtn = [];
  let blueBtn = [];
  for (let btn of btnPlateau) {
    if (btn.id > 0 && btn.id < 40) {
      redBtn.push(btn)
    } else if (btn.id < 100 && btn.id > 59) {
      blueBtn.push(btn)
    }
  }

if(color == 'blue'){
  for (let btn of blueBtn) {
    btn.childNodes[0].color = "#EFEFEF";
    btn.style.color = "#EFEFEF";
  }
}

else if(color=='red'){
  for (let btn of redBtn) {
    btn.childNodes[0].color = "#EFEFEF";
    btn.style.color = "#EFEFEF";
  }
}
}
