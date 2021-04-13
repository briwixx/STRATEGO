class Joueur {
constructor(color) {
  this.pionsJoueur = new Array(40);

  this.pionsJoueur[0] = new Marechal(color);
  this.pionsJoueur[1] = new General(color);

  for (let i = 2; i < 4; i++) {
    this.pionsJoueur[i] = new Colonels(color);
  }
  for (let i = 4; i < 7; i++) {
    this.pionsJoueur[i] = new Commandants(color);
  }
  for (let i = 7; i < 11; i++) {
    this.pionsJoueur[i] = new Capitaines(color);
  }
  for (let i = 11; i < 15; i++) {
    this.pionsJoueur[i] = new Lieutenants(color);
  }
  for (let i = 15; i < 19; i++) {
    this.pionsJoueur[i] = new Sergents(color);
  }
  for (let i = 19; i < 24; i++) {
    this.pionsJoueur[i] = new Demineurs(color);
  }
  for (let i = 24; i < 32; i++) {
    this.pionsJoueur[i] = new Eclaireurs(color);
  }
  this.pionsJoueur[32] = new Espion(color);
  this.pionsJoueur[33] = new Drapeau(color);

  for (let i = 34; i < 40; i++) {
    this.pionsJoueur[i] = new Bombes(color);
  }
  this.pseudo = 'none';
  this.chrono_Start = "";
  this.nb_death = 0;
  this.color = color;
}

set_pseudo(pseudo) {
  this.pseudo = pseudo;
}

PlacementPion(pion, j, plateau, color) {
  return function () {
    console.log(pion.name + " selected");
    let selectedPion = document.getElementById(color + j.toString());

    // Pour chaque case du plateau, si il n'a pas d'enfant (si aucun pion n'est posé dessus), j'y assigne la fonction onclick()
    let boardBtn = document.getElementsByClassName("BoutonDuPlateau");

    for (let i = 0; i < boardBtn.length; i++) {
      if (!boardBtn.item(i).children.length > 0) {
        boardBtn.item(i).onclick = () => onclick(i);
      }
    };


    function onclick(i) {

      let caseTmp = document.getElementById(i);
      let IDs = GetIdOfClickedButton(caseTmp);
      let iTmp = IDs.i;
      let jTmp = IDs.j;


      // [J] Je récupère le nombre de pions bleus présents dans la main du joueur bleu
      let nbBlueBtn = document.getElementsByClassName("bluebtn").length;
      // Si il a + de 0 pions non placés, c'est son tour.
      if (nbBlueBtn > 0) {
        // Si la couleur du pion séléctionné est rouge, message d'erreur
        if (color === "red") {
          alert("C'est au bleu de jouer");
          // Si c'est bleu
        } else if (color === "blue") {
          // Et qu'il est posé sur les 4 dernières lignes du plateau
          if (iTmp > 5) {
            // L'objet pion placé sur le plateau (backend)
            plateau.plateau[iTmp][jTmp] = pion;
            // J'écris le nom du pion sur la case (frontent)
            caseTmp.innerHTML = pion.type;
            console.log(pion.name + " placé sur la case du plateau (" + iTmp + "," + jTmp + ")");
            // Je supprime le pion dans la main du joueur
            pion = null
            selectedPion.remove()
            // Si le pion est posé sur les 2 lignes du milieu
          } else if (iTmp === 4 || iTmp === 5) {
            alert("Vous ne pouvez pas poser votre pion ici ! ")
            // Sinon
          } else {
            alert("Veuillez poser votre pion sur votre partie du plateau !")
          }
        } // Sinon, si le joueur bleu n'a plus de pions a poser, même fonctionnement.
      } else if (nbBlueBtn === 0) {
        if (color === "blue") {
          alert("C'est au rouge de jouer");
        } else if (color === "red") {
          if (iTmp < 4) {
            plateau.plateau[iTmp][jTmp] = pion;
            caseTmp.innerHTML = pion.type;
            console.log(pion.name + " placé sur la case du plateau (" + iTmp + "," + jTmp + ")");
            pion = null
            selectedPion.remove()
          } else if (iTmp === 4 || iTmp === 5) {
            alert("Vous ne pouvez pas poser votre pion ici ! ")
          } else {
            alert("Veuillez poser votre pion sur votre partie du plateau !")
          }
        }
      }
    }
  }
}

//Fonctions qui place les pions dans la case voulue (blueindex & redindex)
randPlacementPion(pion, j, plateau, color){

  let selectedPion = document.getElementById(color + j.toString());
  let caseTmp;

  if (color == 'blue'){
    caseTmp = document.getElementById(blueindex);
    blueindex++;
  }

  else if (color == 'red'){
    caseTmp = document.getElementById(redindex);
    redindex++;
  }

  let IDs = GetIdOfClickedButton(caseTmp);
  let caseI = IDs.i;
  let caseJ = IDs.j;

    // [J] Je récupère le nombre de pions bleus présents dans la main du joueur bleu
    let nbBlueBtn = document.getElementsByClassName("bluebtn").length;
    // Si il a + de 0 pions non placés, c'est son tour.
    if (nbBlueBtn > 0) {
      // Si la couleur du pion séléctionné est rouge, message d'erreur
      if (color === "red") {
        alert("C'est au bleu de jouer");
        // Si c'est bleu
      } else if (color === "blue") {
        // Et qu'il est posé sur les 4 dernières lignes du plateau
        if (caseI > 5) {
          // L'objet pion placé sur le plateau (backend)
          plateau.plateau[caseI][caseJ] = pion;
          // J'écris le nom du pion sur la case (frontent)
          caseTmp.innerHTML = pion.type;
          console.log(pion.name + " placé sur la case du plateau (" + caseI + "," + caseJ + ")");
          // Je supprime le pion dans la main du joueur
          pion = null;
          selectedPion.remove()
          // Si le pion est posé sur les 2 lignes du milieu
        } else if (caseI === 4 || caseI === 5) {
          alert("Vous ne pouvez pas poser votre pion ici ! ")
          // Sinon
        } else {
          alert("Veuillez poser votre pion sur votre partie du plateau !")
        }
      } // Sinon, si le joueur bleu n'a plus de pions a poser, même fonctionnement.
    } else if (nbBlueBtn === 0) {
      if (color === "blue") {
        alert("C'est au rouge de jouer");
      } else if (color === "red") {
        if (caseI < 4) {
          plateau.plateau[caseI][caseJ] = pion;
          caseTmp.innerHTML = pion.type;
          console.log(pion.name + " placé sur la case du plateau (" + caseI + "," + caseI + ")");
          pion = null
          selectedPion.remove()
        } else if (caseI === 4 || caseI === 5) {
          alert("Vous ne pouvez pas poser votre pion ici ! ")
        } else {
          alert("Veuillez poser votre pion sur votre partie du plateau !")
        }
      }
    }
  }
}

//Variables globales pour placement aléatoire dans l'ordre des cases du plateau
let blueindex = 60;
let redindex = 0;

let PlayerRed = new Joueur('red');
let PlayerBlue = new Joueur('blue');
let date = new Date();
