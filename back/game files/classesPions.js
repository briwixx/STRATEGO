// Classes des différents pions :
class Pion {
  constructor(name) {
    this.name = name;
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
    this.posX+=nbCasesX;
    this.posY+=nbCasesY;
    }
    else {
      console.log("Plouf ! (Vous êtes tombé dans un lac ! )")
    }
  }
}

class Marechal extends MovablePion {
  constructor(){
    super("marechal");
  }
  frappeEspion(){

  }
}

class Espion extends MovablePion {
  constructor(){
    super("espion");
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
    super("general");
  }

}

class Eclaireurs extends Pion {
  constructor(){
    super("eclaireur");
  }
//ne bouge qu'en avant
  Avancer(){

  }
}

class Sergents extends MovablePion {
  constructor(){
    super("sergent");
  }

}

class Lieutenants extends MovablePion {
  constructor(){
    super("lieutenant");
  }

}

class Capitaines extends MovablePion {
  constructor(){
    super("capitaine");
  }

}

class Commandants extends MovablePion {
  constructor(){
    super("commandant");
  }

}

class Colonels extends MovablePion {
  constructor(){
    super("colonel");
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
