class Joueur {
  constructor() {
    this.pionsJoueur = new Array(40);

    this.pionsJoueur[0] = new Marechal();
    this.pionsJoueur[1] = new General();

    for(let i = 2 ; i < 4 ; i++){
    this.pionsJoueur[i] = new Colonels();
    }
    for(let i = 4 ; i < 7; i++){
      this.pionsJoueur[i] = new Commandants();
    }
    for(let i = 7 ; i < 11; i++){
      this.pionsJoueur[i] = new Capitaines();
    }
    for(let i = 11 ; i < 15; i++){
      this.pionsJoueur[i] = new Lieutenants;
    }
    for(let i = 15 ; i < 19; i++){
      this.pionsJoueur[i] = new Sergents();
    }
    for(let i = 19 ; i < 24; i++){
      this.pionsJoueur[i] = new Demineurs();
    }
    for(let i = 24 ; i < 32; i++){
      this.pionsJoueur[i] = new Eclaireurs();
    }
    this.pionsJoueur[32] = new Espion();
    this.pionsJoueur[33] = new Drapeau();

    for(let i = 34 ; i < 40; i++){
      this.pionsJoueur[i] = new Bombes();
    }
  }

  PlacementPion(pion,j, plateau, color) {
      return function(){
      console.log(pion.name + " selected");

      let launchgame = document.getElementsByClassName('BoutonDuPlateau');

      for (let i = 0; i < launchgame.length; i++) {

        launchgame.item(i).addEventListener("click",function(){

          let caseTmp = document.getElementById(i);

          let IDs = GetIdOfClickedButton(caseTmp);

          let iTmp = IDs.i;
          let jTmp = IDs.j;

        if (color == 'red'){
          if(plateau.plateau[iTmp][jTmp] != 0 && iTmp >= 5){ //Le joueur rouge peut placer que en bas du plateau
            plateau.plateau[iTmp][jTmp] = pion;
            caseTmp.innerHTML = pion.name.fontcolor(color);
            console.log(pion.name + " placé sur la case du plateau (" + iTmp + "," + jTmp + ")" );
            console.log(plateau.plateau);
          }
          else {
            console.log("Vous ne pouvez pas placer votre ici");
            }
          }

          else if (color == 'blue'){
            if(plateau.plateau[iTmp][jTmp] != 0 && iTmp < 5){ //Le joueur bleu peut placer que en haut du plateau
              plateau.plateau[iTmp][jTmp] = pion;
              caseTmp.innerHTML = pion.name.fontcolor(color);
              console.log(pion.name + " placé sur la case du plateau (" + iTmp + "," + jTmp + ")" );
              console.log(plateau.plateau);
            }
            else {
              console.log("Vous ne pouvez pas placer votre pion ici");
            }
          }
        }
      );

      }

        let pionARemove = document.getElementById(color+j.toString());
        console.log(pionARemove);
        pionARemove.remove();

        let listPionsAPlacer = document.getElementsByClassName('BoutonPion');

        if(listPionsAPlacer.length==0){
          //Appel lancement partie quand les pions sont placés :
        PlayerTurn(PlayerRed,'red');
        }

      };
    }//fin PlacementPion
  }

let PlayerRed = new Joueur();
let PlayerBlue = new Joueur();

function GetIdOfClickedButton(button){
  let idtmp = button.getAttribute('id');

  idtmp = parseInt(idtmp);
  let iTmp = Math.trunc(idtmp/10);
  let jTmp = idtmp%10;

  return{
    i : iTmp,
    j : jTmp
  };
  //Exemple accès aux éléments : let test = GetIdOfClickedButton(button);
  //                             let i = test.i;
  //                             let j =test.j;
}

// Affichage des pions de chaque joueur sous le plateau et listener click:
let divpions = document.getElementById('pionsPlayer');

function genPionsButtons(){

  let msgred = document.createElement("p");
  msgred.textContent = "Pions du joueur Rouge :"
  divpions.appendChild(msgred);

  for (var i = 0; i < PlayerRed.pionsJoueur.length; i++) {
    let butnPion = document.createElement("button");
    butnPion.className = "BoutonPion";
    butnPion.setAttribute('id','red'+i); // attribue un id propre au pion
    butnPion.innerHTML = PlayerRed.pionsJoueur[i].name;
    divpions.appendChild(butnPion);
  }

  let msgblu = document.createElement("p");
  msgblu.textContent = "Pions du joueur Bleu :"
  divpions.appendChild(msgblu);

  for (var i = 0; i < PlayerBlue.pionsJoueur.length; i++) {
    let butnPion = document.createElement("button");
    butnPion.className = "BoutonPion";
    butnPion.setAttribute('id','blue'+i); // attribue un id propre au pion
    butnPion.innerHTML = PlayerBlue.pionsJoueur[i].name;
    divpions.appendChild(butnPion);
  }
}

function AttachEvent(plateau){
  let button;
    //Attache fonction PlacementPion sur les boutons
  for (var i = 0; i < PlayerRed.pionsJoueur.length; i++) {
    button = document.getElementById('red'+i);
    button.addEventListener("click",PlayerRed.PlacementPion(PlayerRed.pionsJoueur[i],i,plateau,'red'));
  }

  for (var i = 0; i < PlayerBlue.pionsJoueur.length; i++) {
    button = document.getElementById('blue'+i);
    button.addEventListener("click",PlayerBlue.PlacementPion(PlayerBlue.pionsJoueur[i],i,plateau,'blue'));
  }
}
