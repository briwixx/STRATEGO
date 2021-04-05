
class Joueur {
constructor() {
  this.pionsJoueur = new Array(40);

  this.pionsJoueur[0] = new Marechal();
  this.pionsJoueur[1] = new General();

  for (let i = 2; i < 4; i++) {
    this.pionsJoueur[i] = new Colonels();
  }
  for (let i = 4; i < 7; i++) {
    this.pionsJoueur[i] = new Commandants();
  }
  for (let i = 7; i < 11; i++) {
    this.pionsJoueur[i] = new Capitaines();
  }
  for (let i = 11; i < 15; i++) {
    this.pionsJoueur[i] = new Lieutenants;
  }
  for (let i = 15; i < 19; i++) {
    this.pionsJoueur[i] = new Sergents();
  }
  for (let i = 19; i < 24; i++) {
    this.pionsJoueur[i] = new Demineurs();
  }
  for (let i = 24; i < 32; i++) {
    this.pionsJoueur[i] = new Eclaireurs();
  }
  this.pionsJoueur[32] = new Espion();
  this.pionsJoueur[33] = new Drapeau();

  for (let i = 34; i < 40; i++) {
    this.pionsJoueur[i] = new Bombes();
  }
}
PlacementPion(pion, j, plateau, color) {
  return function () {
    console.log(pion.name + " selected");
    let selectedPion = document.getElementById(color + j.toString());

    // Pour chaque case du plateau, si il n'a pas d'enfant (si aucun pion n'est posé dessus), j'y assigne la fonction onclick()
    let boardBtn = document.getElementsByClassName("BoutonDuPlateau");

    for (let i = 0; i < boardBtn.length; i++) {
      if (!boardBtn.item(i).children.length > 0) {
        boardBtn.item(i).onclick = () => onclick(i)
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
            caseTmp.innerHTML = pion.name.fontcolor(color);
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
            caseTmp.innerHTML = pion.name.fontcolor(color);
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
}

let PlayerRed = new Joueur();
let PlayerBlue = new Joueur();

function AttachEvent(plateau) {
let button;
// Sur chaque pion du joueur, j'ajoute un onclick() lancant la fonction PlacementPion, en lui envoyant le nom du pion, son index, le plateau, et la couleur du joueur
for (var i = 0; i < PlayerRed.pionsJoueur.length; i++) {
  button = document.getElementById('red' + i);
  button.addEventListener("click", PlayerRed.PlacementPion(PlayerRed.pionsJoueur[i], i, plateau, 'red'));
}

for (var i = 0; i < PlayerBlue.pionsJoueur.length; i++) {
  button = document.getElementById('blue' + i);
  button.addEventListener("click", PlayerBlue.PlacementPion(PlayerBlue.pionsJoueur[i], i, plateau, 'blue'));
}
}

let divpions = document.getElementById('pionsPlayer');
function genPionsButtons() {

let msgred = document.createElement("p");
msgred.textContent = "Pions du joueur Rouge :"
divpions.appendChild(msgred);

for (var i = 0; i < PlayerRed.pionsJoueur.length; i++) {
  let butnPion = document.createElement("button");
  butnPion.className = "BoutonPion redbtn";
  butnPion.setAttribute('id', 'red' + i); // attribue un id propre au pion
  butnPion.innerHTML = PlayerRed.pionsJoueur[i].name;
  divpions.appendChild(butnPion);
}

let msgblu = document.createElement("p");
msgblu.textContent = "Pions du joueur Bleu :"
divpions.appendChild(msgblu);

for (var i = 0; i < PlayerBlue.pionsJoueur.length; i++) {
  let butnPion = document.createElement("button");
  butnPion.className = "BoutonPion bluebtn";
  butnPion.setAttribute('id', 'blue' + i); // attribue un id propre au pion
  butnPion.innerHTML = PlayerBlue.pionsJoueur[i].name;
  divpions.appendChild(butnPion);
}

let btnValidate = document.createElement("button")
btnValidate.innerHTML = "Valider mon tour"
btnValidate.onclick = () => validateTurn()
document.getElementById("buttons").appendChild(btnValidate)
}

function validateTurn() {
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

// Je récupère tout les pions de chaque joueur non posé
let bluePions = document.getElementsByClassName("bluebtn");
let redPions = document.getElementsByClassName("redbtn");
// Si le bleu n'a pas tout posé
if (bluePions.length > 0) {
  alert("Le joueur bleu n'a pas posé tous ses pions");
// Sinon si le bleu a tout posé
} else if (bluePions.length === 0) {
  // Si le rouge n'a rien posé,
  if (redPions.length === 40) {
    // Pour chaque bouton bleu, je rend le texte invisible
    for (let btn of blueBtn) {
      btn.childNodes[0].color = "#EFEFEF";
      btn.style.color = "#EFEFEF";
    }
  // Sinon, si le rouge a tout posé
  } else if (redPions.length === 0) {
    // J'affiche les boutons bleus
    for (let btn of blueBtn) {
      btn.childNodes[0].color = "blue";
      btn.style.color = "blue";
    }
    // J'affiche les boutons rouges
    for (let btn of redBtn) {
      btn.childNodes[0].color = "red";
      btn.style.color = "red";
    }
    //Lancement partie pour le joueur rouge
    alert("Tous les pions sont placés, lancement de la partie.");
    PlayerTurn(PlayerRed,'red');
  // Sinon ( si le rouge n'a pas tout posé (0<nbpionrouge<40))
  } else {
    alert("Le joueur rouge n'a pas posé tous ses pions.");
  }
}
}


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
