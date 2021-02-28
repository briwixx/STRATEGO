class Pion {
  constructor() {
  }

  FirstPlacement(posX,posY) {
    this.posX = posX;
    this.posY = posY;
  }

  captureDrapeau(){
    //fin de partie
  }
}

class MovablePion extends Pion {
  constructor() {
    super();
  }
  Avancer(nbCasesX,nbCasesY){ // Bombes et Drapeau peuvent pas bouger, Eclaireur que en avant
    this.posX+=nbCasesX;
    this.posY+=nbCasesY;
  }
}

class Marechal extends MovablePion {
  constructor(){
    super();
  }
  frappeEspion(){

  }
}

class Espion extends MovablePion {
  constructor(){
    super();
  }
  frappeMarechal(){

  }
}

class Demineurs extends MovablePion {
  constructor(){
    super();
  }
  demineBombe(){

  }
}

class General extends MovablePion {
  constructor(){
    super();
  }

}

class Eclaireurs extends MovablePion {
  constructor(){
    super();
  }
//ne bouge qu'en avant
}

class Sergents extends MovablePion {
  constructor(){
    super();
  }

}

class Lieutenants extends MovablePion {
  constructor(){
    super();
  }

}

class Capitaines extends MovablePion {
  constructor(){
    super();
  }

}

class Commandants extends MovablePion {
  constructor(){
    super();
  }

}

class Colonels extends MovablePion {
  constructor(){
    super();
  }

}

class Drapeau extends Pion{
  constructor(){
    super();
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
    super();
  }

}
