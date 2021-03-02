class Joueur {
  constructor(nbPieces) {
    this.pionsJoueur = new Array(nbPieces);

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
  yourTurn(){
    if(this.pionsJoueur[33]==false){
      return false;
    }
    else{
      return true;
    }
  }
}

let PlayerRed = new Joueur(40);
let PlayerBlue = new Joueur(40);
