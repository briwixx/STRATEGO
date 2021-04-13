
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

let divpionsred = document.getElementById('pionsPlayerRed');
let divpionsblue = document.getElementById('pionsPlayerBlue');

function genPionsButtons() {
let msgred = document.createElement("p");
msgred.textContent = "Pions du joueur Rouge :"
divpionsred.appendChild(msgred);

for (var i = 0; i < PlayerRed.pionsJoueur.length; i++) {
  let butnPion = document.createElement("button");
  butnPion.className = "BoutonPion redbtn";
  butnPion.setAttribute('id', 'red' + i); // attribue un id propre au pion
  butnPion.innerHTML = PlayerRed.pionsJoueur[i].type;
  divpionsred.appendChild(butnPion);
}

let msgblu = document.createElement("p");
msgblu.textContent = "Pions du joueur Bleu :"
divpionsblue.appendChild(msgblu);

for (var i = 0; i < PlayerBlue.pionsJoueur.length; i++) {
  let butnPion = document.createElement("button");
  butnPion.className = "BoutonPion bluebtn";
  butnPion.setAttribute('id', 'blue' + i); // attribue un id propre au pion
  butnPion.innerHTML = PlayerBlue.pionsJoueur[i].type;
  divpionsblue.appendChild(butnPion);
}

let btnValidate = document.createElement("button")
btnValidate.innerHTML = "Valider mon tour"
btnValidate.onclick = () => validateTurn()
document.getElementById("buttons").appendChild(btnValidate)

//Boutons qui activent le placement aléatoire
let btnRandomblue = document.createElement('button');
btnRandomblue.innerHTML = "Placement Random Bleu";
btnRandomblue.onclick = () => randomPlacement(PlayerBlue);
document.getElementById("pionsPlayerBlue").appendChild(btnRandomblue);

let btnRandomred = document.createElement('button');
btnRandomred.innerHTML = "Placement Random Red";
btnRandomred.onclick = () => randomPlacement(PlayerRed);
document.getElementById("pionsPlayerRed").appendChild(btnRandomred);
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

    PlayerRed.chrono_Start = {
      heure: ('0' + date.getHours()).slice(-2),
      minute: ('0' + date.getMinutes()).slice(-2),
      seconde: ('0' + date.getSeconds()).slice(-2)
    };

    PlayerRed.timeR = {
      minute : 0, seconde : 0
    }
    PlayerBlue.timeR = {
      minute : 0, seconde : 0
    }

    PlayerRed.chrono = {
      minute: date.getMinutes(),
      seconde: date.getSeconds()
    };
    PlayerBlue.chrono = {
      minute: 0,
      seconde: 0
    };
        alert("Tous les pions sont placés, lancement de la partie.");
    //Appel lancement partie quand les pions sont placés :
    PlayerTurn(PlayerRed, 'red');
      }
      ;
  // Sinon ( si le rouge n'a pas tout posé (0<nbpionrouge<40))
  } else {
    alert("Le joueur rouge n'a pas posé tous ses pions.");
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
