class Joueur {
  constructor(nbPieces) {
    let pionsJoueur = new Array(nbPieces);

    pionsJoueur[0] = new Marechal();
    pionsJoueur[1] = new General();

    for(let i = 2 ; i < 3 ; i++){
    pionsJoueur[i] = new Colonels();
    }
    for(let i = 4 ; i < 6; i++){
      pionsJoueur[i] = new Commandants();
    }
    for(let i = 7 ; i < 10; i++){
      pionsJoueur[i] = new Capitaines();
    }
    for(let i = 11 ; i < 14; i++){
      pionsJoueur[i] = new Lieutenants;
    }
    for(let i = 15 ; i < 18; i++){
      pionsJoueur[i] = new Sergents();
    }
    for(let i = 19 ; i < 23; i++){
      pionsJoueur[i] = new Demineurs();
    }
    for(let i = 24 ; i < 31; i++){
      pionsJoueur[i] = new Demineurs();
    }
    pionsJoueur[32] = new Espion();
    pionsJoueur[33] = new Drapeau();

    for(let i = 34 ; i < 39; i++){
      pionsJoueur[i] = new Bombes();
    }
  }
}

let PlayerRed = new Joueur(40);
let PlayerBlue = new Joueur(40);
