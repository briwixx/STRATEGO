//champ de texte pseudo
function getPseudo(){
  let psdo = document.getElementById('pseudoquery').value;
  let psdo2 = document.getElementById('pseudoquery2').value;
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
  PlayerRed.set_pseudo(getPseudo().j1);
  PlayerBlue.set_pseudo(getPseudo().j2);
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
        butn.innerHTML = "";
        butn.setAttribute("style","width: 100px; height: 100px;");
        divplateau.appendChild(butn);
      }

      if (plateau.plateau[i][j]==0){ // Si case du plateau = 0 (lac)
        let butnlac = document.createElement("button");
        butnlac.className = "BoutonDuPlateau";
        butnlac.setAttribute('id',i+''+j);
        butnlac.innerHTML = '<img src="./../PionCouleurs/lacquibouge.gif" />';
        divplateau.appendChild(butnlac);
      }

    }
    divplateau.appendChild(document.createElement('br')); // retours à la ligne
  }

}

//Lancement de la game, se finit lorsque le drapeau est capturé
function PlayerTurn(Player,color) {
  alert("C'est au joueur " + color + " de jouer");

  /* AFFICHER PSEUDO DU JOUEUR QUI JOUE */
  //document.write("<h2> <script>Player.pseudo</script> </h2>");

  /* PLAYER BLUE WIN */
  if (PlayerRed.pionsJoueur[33].isTaken()) {
    Redirect_Score(PlayerBlue.pseudo);
  }
  /* PLAYER RED WIN */
  else if (PlayerBlue.pionsJoueur[33].isTaken()) {
    Redirect_Score(PlayerRed.pseudo);
  }

  //GET LE PION A FAIRE AVANCER
  let elmt = 0;
  let elmt2 = 0;
  let iDeb, jDeb, iFin, jFin;
  let listenerButtns = document.getElementsByClassName('BoutonDuPlateau');
  for(let i = 0 ; i < listenerButtns.length ; i++) {
    let butnTMP = listenerButtns[i];
    butnTMP.onclick = function () {
      elmt = document.getElementById(i.toString());
      let varID = GetIdOfClickedButton(elmt);//Recupère l'indice i et j du pion dans le plateau
      iDeb = varID.i;
      jDeb = varID.j;

      for (let j = 0; j < listenerButtns.length; j++) {
        listenerButtns.item(j).addEventListener('click',
            function () {
              elmt2 = document.getElementById(j.toString());
              let varID2 = GetIdOfClickedButton(elmt2);//Recupère l'indice i et j du pion dans le plateau
              iFin = varID2.i;
              jFin = varID2.j;
              plateau.plateau[iDeb][jDeb].Avancer(iFin, jFin, pion);

              //Recursivité en fonction du joueur qui joue
              if (color == 'red') {
                HideOponent('blue');
                let t = new Date();
                PlayerRed.timeR.minute += t.getMinutes() - PlayerRed.chrono.minute;
                PlayerRed.timeR.seconde += t.getSeconds() - PlayerRed.chrono.seconde;
                PlayerBlue.chrono.minute  = t.getMinutes();
                PlayerBlue.chrono.seconde = t.getSeconds();
                PlayerTurn(PlayerRed, 'red');
              }
              else if (color == 'blue') {
                HideOponent('red');
                let t = new Date();
                PlayerBlue.timeR.minute += t.getMinutes() - PlayerBlue.chrono.minute;
                PlayerBlue.timeR.seconde += t.getSeconds() - PlayerBlue.chrono.seconde;
                PlayerRed.chrono.minute  = t.getMinutes();
                PlayerRed.chrono.seconde = t.getSeconds();
                PlayerTurn(PlayerBlue, 'blue');
              }
            }
        );
      }
    }
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


function Redirect_Score(pseudo){
  let date = new Date();
  let time = {
    hour: (date.getHours() - PlayerRed.chrono_Start.heure).toString(),
    minute: (date.getMinutes() - PlayerRed.chrono_Start.minute).toString(),
    seconds: (Math.ceil(date.getSeconds() - PlayerRed.chrono_Start.seconde)).toString(), //Valeur absolu
  };
  PlayerRed.score = (10000 * (date.getMinutes() - PlayerRed.chrono_Start.minute)/PlayerRed.timeR.minute + 10000 * (date.getSeconds() - PlayerRed.chrono_Start.seconde)/PlayerRed.timeR.seconde) / PlayerRed.nb_death;
  PlayerBlue.score = (10000 * (date.getMinutes() - PlayerBlue.chrono_Start.minute)/PlayerBlue.timeR.minute + 10000 * (date.getSeconds() - PlayerBlue.chrono_Start.seconde)/PlayerBlue.timeR.seconde) / PlayerBlue.nb_death;

  let pseudo_w, nb_w, time_w, score_w, pseudo_l, nb_l, time_l, score_l;
  if(pseudo == PlayerBlue.pseudo){
        pseudo_w = PlayerBlue.pseudo,
        nb_w = PlayerBlue.nb_death,
        time_w = (PlayerBlue.timeR.minute).toString() + "min " + (PlayerBlue.timeR.seconde).toString() + "sec",
        score_w = PlayerBlue.score,
        pseudo_l = PlayerRed.pseudo,
        nb_l = PlayerRed.nb_death,
        time_l = (PlayerRed.timeR.minute).toString() + "min " + (PlayerRed.timeR.seconde).toString() + "sec",
        score_l = PlayerRed.score;
  }
  else{
        pseudo_w = PlayerRed.pseudo,
        nb_w = PlayerRed.nb_death,
        time_w = (PlayerRed.timeR.minute).toString() + "min " + (PlayerRed.timeR.seconde).toString() + "sec",
        score_w = PlayerRed.score,
        pseudo_l = PlayerBlue.pseudo,
        nb_l = PlayerBlue.nb_death,
        time_l = (PlayerBlue.timeR.minute).toString() + "min " + (PlayerBlue.timeR.seconde).toString() + "sec",
        score_l = PlayerBlue.score;
  }
  // Redirection vers la page score en passant le WINNER & le TIME GAME dans l'URL
  document.location.href = "score.html?name_w=" + pseudo_w + "&name_l=" + pseudo_l + "&nb_w" + nb_w + "&nb_l" + nb_l + "&time_w" + time_w + "&time_l" + time_l + "&score_w" + score_w + "&score_l" + score_l + "&h=" + time.hour+"&min="+time.minute+"&sec="+time.seconds;
}
