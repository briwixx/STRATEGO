class Pion{
  constructor(name, lvl, color) {
    this.name = name;
    this.lvl = lvl;
    this.color = color;
  }

  FirstPlacement(posX,posY) {
    this.posX = posX;
    this.posY = posY;
  }
}

class MovablePion extends Pion {
  constructor(name, lvl, color) {
    super(name, lvl, color);
  }
  /*----------- MOOV -----------*/
  Avancer(nbCasesX,nbCasesY,plateau){
    // Avance que d'une case
    // Si c'est pas un éclaireur = qu'il ne peut avancer que d'une case, qu'il ne va pas dans un lac et qu'il ne va pas en diagonale : Go avancer d'une case!
    if(this.name !== 'eclaireur' && plateau[nbCasesX][nbCasesY] != 0 && (nbCasesX+1 == this.posX && nbCasesY == this.posY) || (nbCasesY+1 == this.posY&& nbCasesX == this.posX) || (nbCasesX-1 == this.posX && nbCasesY == this.posY)|| (nbCasesY-1 == this.posY && nbCasesX == this.posX)) {
      if (plateau[nbCasesX][nbCasesY] == 1) {
        plateau[nbCasesX][nbCasesY] = plateau[this.posX][this.posY];
        plateau[this.posX][this.posY] = 1;
        this.posX = nbCasesX;
        this.posY = nbCasesY;
      }

      // Si le pion se déplace sur une case occupée par un pion ennemi : FIGHT !!
      else if (plateau[nbCasesX][nbCasesY] instanceof Pion && plateau[nbCasesX][nbCasesY].color != this.color) {
        switch (plateau[nbCasesX][nbCasesY].lvl) {
            // On bat ! (+ Espion VS maréchal + Démineur VS bombes)
            case (this.lvl == 1 && plateau[nbCasesX][nbCasesY].lvl == 10) || (this.lvl == 3 && plateau[nbCasesX][nbCasesY] == 30) || (this.lvl > plateau[nbCasesX][nbCasesY].lvl && plateau[nbCasesX][nbCasesY].lvl > 0 ):
              plateau[nbCasesX][nbCasesY] = plateau[this.posX][this.posY];
              plateau[this.posX][this.posY] = 1;
              this.posX = nbCasesX;
              this.posY = nbCasesY;
              break;

            // Battu
            case this.lvl < plateau[nbCasesX][nbCasesY].lvl && plateau[nbCasesX][nbCasesY].lvl != 30:
              plateau[this.posX][this.posY] = 1;
              break;

            // Combat entre 2 même pions OU Battu avec une bombe
            case this.lvl == plateau[nbCasesX][nbCasesY].lvl || plateau[nbCasesX][nbCasesY].lvl == 30:
              plateau[nbCasesX][nbCasesY] = 1;
              plateau[this.posX][this.posY] = 1;
              break;

            // WIN : Drapeau pris
            case Plateau[nbCasesX][nbCasesY].lvl == 0:
              plateau[nbCasesX][nbCasesY].isTaken();
              break;
          }
        }
    }

    /*----------- MOOV ECLAIREUR -----------*/
    if(this.name == 'eclaireur' && check_moove_eclaireur(plateau, this, nbCasesX, nbCasesY)){
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

/* --------- Les différents pions : --------- */
class Marechal extends MovablePion {
  constructor(color){
    super("marechal", 10, color);
  }
}

class Espion extends MovablePion {
  constructor(color){
    super("espion", 1, color);
  }
}

class Demineurs extends MovablePion {
  constructor(color){
    super("demineur", 3, color);
  }
}

class General extends MovablePion {
  constructor(color){
    super("general", 9, color);
  }
}

class Eclaireurs extends MovablePion {
  constructor(color){
    super("eclaireur", 2, color);
  }
}

class Sergents extends MovablePion {
  constructor(color){
    super("sergent", 4, color);
  }

}

class Lieutenants extends MovablePion {
  constructor(color){
    super("lieutenant", 5, color);
  }

}

class Capitaines extends MovablePion {
  constructor(color){
    super("capitaine", 6, color);
  }

}

class Commandants extends MovablePion {
  constructor(color){
    super("commandant", 7, color);
  }
}

class Colonels extends MovablePion {
  constructor(color){
    super("colonel", 8, color);
  }
}

class Drapeau extends Pion{
  constructor(color){
    super("drapeau", 0, color);
    this.taken = false;
  }
  //Méthodes :
  isTaken(){
    if(this.taken == false) {
        // ARRET CHRONO PARTIE
        this.taken = true;
    }
    else if (this.taken == true){
      return this.taken;
    }
  }
}

class Bombes extends Pion {
  constructor(color){
    super("bombe", 30, color);
  }
}

// Check s'il n'y a pas de lac ou de pion(s) entre sa position initiale et sa position après déplacement - 1 : il peut arriver sur une case ennemie FIGHTT!!
function check_moove_eclaireur(plateau, pion, nbCaseX, nbCaseY){
  let voix_libre = true;
    // Par défaut en true au moindre obstacle passera à falses

  switch(pion){
  // avance en x+
    case pion.posX < nbCaseX && pion.posY == nbCaseY:
      for(let i = 1; i < nbCaseX-pion.posX; i++){
        if(plateau[i + pion.posX][pion.posY] != 1){
          voix_libre = false;
          return voix_libre;
        }}
      break;

    // avance en x-
    case pion.posX > nbCaseX && pion.posY == nbCaseY:
      for(let i = 1; i < pion.posX-nbCaseX; i++){
        if(plateau[pion.posX - i][pion.posY] != 1) {
          voix_libre = false;
          return voix_libre;
        }}
      break;

    // avance en y+
    case pion.posY < nbCaseX && pion.posX == nbCaseX:
      for(let i = 1; i < nbCaseY-pion.posY; i++){
        if(plateau[pion.posX][pion.posY + i] != 1){
          voix_libre = false;
          return voix_libre;
        }}
      break;

    // avance en y-
    case pion.posY > nbCaseY && pion.posX == nbCaseX:
      for(let i = 1; i < pion.posY-nbCaseY; i++){
        if(plateau[pion.posX][pion.posY - i] != 1){
          voix_libre = false;
          return voix_libre;
        }}
      break;
  }
  return voix_libre;
}
