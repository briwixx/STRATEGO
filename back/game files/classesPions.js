// Classes des différents pions :
class Pion {
  constructor(name, lvl) {
    this.name = name;
    this.lvl = lvl;
  }

  FirstPlacement(posX,posY) {
    this.posX = posX;
    this.posY = posY;
  }
}

class MovablePion extends Pion {
  constructor(name) {
    super(name);
  }
  Avancer(nbCasesX,nbCasesY,plateau){ // Bombes et Drapeau peuvent pas bouger, Eclaireur que en avant
    if(plateau[nbCasesX][nbCasesY]==1){
    this.posX=nbCasesX;
    this.posY=nbCasesY;
    }
    else if(typeof(plateau[nbCasesX][nbCasesY]) === "object"){
      switch(plateau[nbCasesX][nbCasesY].lvl){
        // Espion vs maréchal
        case this.lvl == 1 && plateau[nbCasesX][nbCasesY].lvl == 10:
          plateau[nbCasesX][nbCasesY].name = this.name;
          plateau[nbCasesX][nbCasesY].lvl = this.lvl;
          break;
        // Battu
        case this.lvl < plateau[nbCasesX][nbCasesY].lvl :

          break;
        // On bat
        case this.lvl > plateau[nbCasesX][nbCasesY].lvl :
          plateau[nbCasesX][nbCasesY].name = this.name;
          plateau[nbCasesX][nbCasesY].lvl = this.lvl;
          break;
      }
    }
    else {
      console.log("Plouf ! (Vous êtes tombé dans un lac ! )")
    }
  }
}

class Marechal extends MovablePion {
  constructor(){
    super("marechal", 10);
  }
  frappeEspion(){

  }
}

class Espion extends MovablePion {
  constructor(){
    super("espion", 1);
  }
  frappeMarechal(){

  }
}

class Demineurs extends MovablePion {
  constructor(){
    super("demineur");
  }
  demineBombe(){

  }
}

class General extends MovablePion {
  constructor(){
    super("general", 9);
  }

}

class Eclaireurs extends Pion {
  constructor(){
    super("eclaireur", 2);
  }
//ne bouge qu'en avant
  Avancer(){

  }
}

class Sergents extends MovablePion {
  constructor(){
    super("sergent", 4);
  }

}

class Lieutenants extends MovablePion {
  constructor(){
    super("lieutenant", 5);
  }

}

class Capitaines extends MovablePion {
  constructor(){
    super("capitaine", 6);
  }

}

class Commandants extends MovablePion {
  constructor(){
    super("commandant", 7);
  }

}

class Colonels extends MovablePion {
  constructor(){
    super("colonel", 8);
  }

}

class Drapeau extends Pion{
  constructor(){
    super("drapeau");
    this.taken = false;
  }
  //Méthodes :
  isTaken(){
    if(this.taken == false) {
      if (Pion.captureDrapeau == true){ //Si un pion parvient à prendre le drapeau
        this.taken = true;
      }
    }
    else if (this.taken == true){
      return this.taken;
    }
  }
}


class Bombes extends Pion {
  constructor(){
    super("bombe");
  }
}
