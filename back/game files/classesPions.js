// Classes des différents pions :
class Pion {
  constructor(name, lvl,type) {
    this.name = name;
    this.lvl = lvl;
    this.type = type;
    this.posX = 0;
    this.posY = 0;
  }
}

class MovablePion extends Pion {
  constructor(name,type) {
    super(name, type);
  }
  Avancer(nbCasesX,nbCasesY){
    // Avance que d'une case
    // Si c'est pas un éclaireur = qu'il ne peut avancer que d'une case, qu'il ne va pas dans un lac et qu'il ne va pas en diagonale : Go avancer d'une case!
    if(this.name !== 'eclaireur' && plateau.plateau[nbCasesX][nbCasesY] != 0 && (nbCasesX+1 == this.posX && nbCasesY == this.posY) || (nbCasesY+1 == this.posY&& nbCasesX == this.posX) || (nbCasesX-1 == this.posX && nbCasesY == this.posY)|| (nbCasesY-1 == this.posY && nbCasesX == this.posX)) {
      if (plateau.plateau[nbCasesX][nbCasesY] == 1) {
        plateau.plateau[nbCasesX][nbCasesY] = plateau.plateau[this.posX][this.posY];
        plateau.plateau[this.posX][this.posY] = 1;
        this.posX = nbCasesX;
        this.posY = nbCasesY;
      }

      // Si le pion se déplace sur une case occupée par un pion ennemi : FIGHT !!
      else if (plateau.plateau[nbCasesX][nbCasesY] instanceof Pion && plateau.plateau[nbCasesX][nbCasesY].color != this.color) {
        switch (plateau.plateau[nbCasesX][nbCasesY].lvl) {
            // On bat ! (+ Espion VS maréchal + Démineur VS bombes)
            case (this.lvl == 1 && plateau.plateau[nbCasesX][nbCasesY].lvl == 10) || (this.lvl == 3 && plateau.plateau[nbCasesX][nbCasesY] == 30) || (this.lvl > plateau.plateau[nbCasesX][nbCasesY].lvl && plateau.plateau[nbCasesX][nbCasesY].lvl > 0 ):
              plateau.plateau[nbCasesX][nbCasesY] = plateau.plateau[this.posX][this.posY];
              plateau.plateau[this.posX][this.posY] = 1;
              this.posX = nbCasesX;
              this.posY = nbCasesY;
              break;

            // Battu
            case this.lvl < plateau.plateau[nbCasesX][nbCasesY].lvl && plateau.plateau[nbCasesX][nbCasesY].lvl != 30:
              plateau.plateau[this.posX][this.posY] = 1;
              break;

            // Combat entre 2 même pions OU Battu avec une bombe
            case this.lvl == plateau.plateau[nbCasesX][nbCasesY].lvl || plateau.plateau[nbCasesX][nbCasesY].lvl == 30:
              plateau.plateau[nbCasesX][nbCasesY] = 1;
              plateau.plateau[this.posX][this.posY] = 1;
              break;

            // WIN : Drapeau pris
            case plateau.plateau[nbCasesX][nbCasesY].lvl == 0:
              plateau.plateau[nbCasesX][nbCasesY].isTaken();
              break;
          }
        }
    }
    }
}

class Marechal extends MovablePion {
  constructor(color){
    super("marechal", 10);
    this.color = color;
    this.type = '<img src="../pionStratego/marechal.png" />';
  }
  frappeEspion(){

  }
}

class Espion extends MovablePion {
  constructor(color){
    super("espion", 1);
    this.color = color;
    this.type = '<img src="../pionStratego/espion.png" />';
  }
  frappeMarechal(){

  }
}

class Demineurs extends MovablePion {
  constructor(color){
    super("demineur");
    this.color = color;
    this.type = '<img src="../pionStratego/demineur.png" />';
  }
  demineBombe(){

  }
}

class General extends MovablePion {
  constructor(color){
    super("general", 9);
    this.color = color;
    this.type = '<img src="../pionStratego/general.png" />';
  }

}

class Eclaireurs extends Pion {
  constructor(color){
    super("eclaireur", 2);
    this.color = color;
    this.type = '<img src="../pionStratego/eclaireur.png" />';
  }

  Avancer(nbCasesX,nbCasesY,plateau){
    /*----------- MOOV ECLAIREUR -----------*/
    if(check_moove_eclaireur(plateau, this, nbCasesX, nbCasesY)){
      // Fight de 2 éclaireurs OU Fight avec une bombe
      if((plateau[nbCasesX][nbCasesY].name == 'eclaireur' || plateau[nbCasesX][nbCasesY].lvl == 30) && this.color != plateau[nbCasesX][nbCasesY].color){
        plateau[nbCasesX][nbCasesY] = 1;
        plateau[this.posX][this.posY] = 1;
      }
      // L'éclaireur perd
      else if(plateau[nbCasesX][nbCasesY].lvl > this.lvl && plateau[nbCasesX][nbCasesY].name != 'drapeau' && this.color != plateau[nbCasesX][nbCasesY].color){
        plateau[this.posX][this.posY] = 1;
      }
      // L'éclaireur gagne (que contre l'espionne)
      else if(plateau[nbCasesX][nbCasesY].name == 'espion' && this.color != plateau[nbCasesX][nbCasesY].color){
        plateau[nbCasesX][nbCasesY] = plateau[this.posX][this.posY];
        plateau[this.posX][this.posY] = 1;
        this.posX = nbCasesX;
        this.posY = nbCasesY;
      }
      // Il prend le drapeau
      else if(plateau[nbCasesX][nbCasesY].name == 'drapeau' && this.color != plateau[nbCasesX][nbCasesY].color){
        plateau[nbCasesX][nbCasesY].isTaken();
      }
    }
  }
}

class Sergents extends MovablePion {
  constructor(color){
    super("sergent", 4);
    this.color = color;
    this.type = '<img src="../pionStratego/sergent.png" />';
  }

}

class Lieutenants extends MovablePion {
  constructor(color){
    super("lieutenant", 5);
    this.color = color;
    this.type = '<img src="../pionStratego/lieutenant.png" />';
  }

}

class Capitaines extends MovablePion {
  constructor(color){
    super("capitaine", 6);
    this.color = color;
    this.type = '<img src="../pionStratego/capitaine.png" />';
  }

}

class Commandants extends MovablePion {
  constructor(color){
    super("commandant", 7);
    this.color = color;
    this.type = '<img src="../pionStratego/commandant.png" />';
  }

}

class Colonels extends MovablePion {
  constructor(color){
    super("colonel", 8);
    this.color = color;
    this.type = '<img src="../pionStratego/colonel.png" />';
  }

}

class Drapeau extends Pion{
  constructor(color){
    super("drapeau");
    this.color = color;
    this.type = '<img src="../pionStratego/drapeau.png" />';
    this.taken = false;
  }
  //Méthodes :
  isTaken(){
    if(this.taken == false) {
        this.taken = true;
    }
    else if (this.taken == true){
      return this.taken;
    }
  }
}


class Bombes extends Pion {
  constructor(color){
    super("bombe");
    this.color = color;
    this.type = '<img src="../pionStratego/bombe.png" />';
  }
}

// Check s'il n'y a pas de lac ou de pion(s) entre sa position initiale et sa position après déplacement - 1 : il peut arriver sur une case ennemie FIGHTT!!
function check_moove_eclaireur(pion, nbCaseX, nbCaseY){
  let voix_libre = true;
    // Par défaut en true au moindre obstacle passera à falses

  switch(pion){
  // avance en x+
    case pion.posX < nbCaseX && pion.posY == nbCaseY:
      for(let i = 1; i < nbCaseX-pion.posX; i++){
        if(plateau.plateau[i + pion.posX][pion.posY] != 1){
          voix_libre = false;
          return voix_libre;
        }}
      break;

    // avance en x-
    case pion.posX > nbCaseX && pion.posY == nbCaseY:
      for(let i = 1; i < pion.posX-nbCaseX; i++){
        if(plateau.plateau[pion.posX - i][pion.posY] != 1) {
          voix_libre = false;
          return voix_libre;
        }}
      break;

    // avance en y+
    case pion.posY < nbCaseX && pion.posX == nbCaseX:
      for(let i = 1; i < nbCaseY-pion.posY; i++){
        if(plateau.plateau[pion.posX][pion.posY + i] != 1){
          voix_libre = false;
          return voix_libre;
        }}
      break;

    // avance en y-
    case pion.posY > nbCaseY && pion.posX == nbCaseX:
      for(let i = 1; i < pion.posY-nbCaseY; i++){
        if(plateau.plateau[pion.posX][pion.posY - i] != 1){
          voix_libre = false;
          return voix_libre;
        }}
      break;
  }
  return voix_libre;
}
