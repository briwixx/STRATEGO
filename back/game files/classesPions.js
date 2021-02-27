class Pion {
  constructor() {
  }
}

class MovablePion extends Pion {
  constructor() {

  }
}

Pion.protoype.FirstPlacement(posX, posY){
  this.posX = posX;
  this.posY = posY;
}

MovablePion.protoype.Avancer(nbCasesX,nbCasesY){ // Bombes et Drapeau can't move, Eclaireur que en avant
  this.posX+=nbCasesX;
  this.posY+=nbCasesY;
}

Pion.protoype.captureDrapeau(){
  //fin de partie
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

  }

}

class Bombes extends Pion {
  constructor(){

  }

}
