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
}

let PlayerRed = new Joueur();
let PlayerBlue = new Joueur();



// Affichage des pions de chaque joueur sous le plateau :
let divpions = document.getElementById('pionsPlayer');

function genPionsButtons(){

  let msgred = document.createElement("p");
  msgred.textContent = "Pions du joueur Rouge :"
  divpions.appendChild(msgred);
  for (var i = 0; i < PlayerRed.pionsJoueur.length; i++) {
    let butnPion = document.createElement("button");
    butnPion.className = "BoutonPion";
    butnPion.innerHTML = PlayerRed.pionsJoueur[i].name;
    divpions.appendChild(butnPion);
  }

  let msgblu = document.createElement("p");
  msgblu.textContent = "Pions du joueur Bleu :"
  divpions.appendChild(msgblu);
  for (var i = 0; i < PlayerBlue.pionsJoueur.length; i++) {
    let butnPion = document.createElement("button");
    butnPion.className = "BoutonPion";
    butnPion.innerHTML = PlayerBlue.pionsJoueur[i].name;
    divpions.appendChild(butnPion);
  }
}
