// Classes des différents pions :
class Pion {
  constructor(name, lvl, color) {
    this.name = name;
    this.lvl = lvl;
    this.color = color;
  }
}

class MovablePion extends Pion {
  constructor(name,type, color) {
    super(name, type, color);
  }
  Avancer(iDest,jDest,iDeb,jDeb,idDeb,idFin){
    //Avance que d'une case
    // Si c'est pas un éclaireur = qu'il ne peut avancer que d'une case, qu'il ne va pas dans un lac et qu'il ne va pas en diagonale : Go avancer d'une case!
    if(this.name != 'eclaireur' && plateau.plateau[iDest][jDest] != 0 && (iDest+1 == iDeb && jDest == jDeb) || (jDest+1 == jDeb&& iDest == iDeb) || (iDest-1 == iDeb && jDest == jDeb)|| (jDest-1 == jDeb && iDest == iDeb)) {
      if (plateau.plateau[iDest][jDest] == 1) {
        plateau.plateau[iDest][jDest] = plateau.plateau[iDeb][jDeb];
        plateau.plateau[iDeb][jDeb] = 1;

        let caseAvider = document.getElementById(idDeb);
        let caseAremplir = document.getElementById(idFin);

        caseAvider.innerHTML = '';
        caseAremplir.innerHTML = this.type;
    }

          // Si le pion se déplace sur une case occupée par un pion ennemi : FIGHT !!
          else if (plateau.plateau[iDest][jDest] instanceof Pion && plateau.plateau[iDest][jDest].color != this.color) {
            switch (plateau.plateau[iDest][jDest].lvl) {
                // On bat ! (+ Espion VS maréchal + Démineur VS bombes)
                case (this.lvl == 1 && plateau.plateau[iDest][jDest].lvl == 10) || (this.lvl == 3 && plateau.plateau[iDest][jDest] == 30) || (this.lvl > plateau.plateau[iDest][jDest].lvl && plateau.plateau[iDest][jDest].lvl > 0 ):
                  plateau.plateau[iDest][jDest].nb_death ++;
                  plateau.plateau[iDest][jDest] = plateau.plateau[iDeb][jDeb];
                  plateau.plateau[iDeb][jDeb] = 1;
                  iDeb = iDest;
                  jDeb = jDest;
                  break;

                // Battu
                case this.lvl < plateau.plateau[iDest][jDest].lvl && plateau.plateau[iDest][jDest].lvl != 30:
                  plateau.plateau[iDeb][jDeb] = 1;
                  this.nb_death ++;
                  break;

                // Combat entre 2 même pions OU Battu avec une bombe
                case this.lvl == plateau.plateau[iDest][jDest].lvl || plateau.plateau[iDest][jDest].lvl == 30:
                  plateau.plateau[iDest][jDest].nb_death ++;
                  this.nb_death ++;
                  plateau.plateau[iDest][jDest] = 1;
                  plateau.plateau[iDeb][jDeb] = 1;
                  break;

                // WIN : Drapeau pris
                case plateau.plateau[iDest][jDest].lvl == 0:
                  plateau.plateau[iDest][jDest].isTaken();
                  break;
              }
            }
        }
        }
    }

    class Marechal extends MovablePion {
      constructor(color){
        super("marechal", 10, color);
        this.color = color;
        if(color == 'red'){
          this.type = '<img src="../PionCouleurs/marshal-red.png" />';
        }
        else {
          this.type = '<img src="../PionCouleurs/marshal-blue.png" />';
        }
      }
    }

    class Espion extends MovablePion {
      constructor(color){
        super("espion", 1, color);
        this.color = color;
        if(color == 'red'){
          this.type = '<img src="../PionCouleurs/spy-red.png" />';
        }
        else {
          this.type = '<img src="../PionCouleurs/spy-blue.png" />';
        }
      }
    }

    class Demineurs extends MovablePion {
      constructor(color){
        super("demineur", 3, color);
        this.color = color;
        if(color == 'red'){
          this.type = '<img src="../PionCouleurs/miner-red.png" />';
        }
        else {
          this.type = '<img src="../PionCouleurs/miner-blue.png" />';
        }
      }
    }

    class General extends MovablePion {
      constructor(color){
        super("general", 9, color);
        this.color = color;
        if(color == 'red'){
          this.type = '<img src="../PionCouleurs/general-red.png" />';
        }
        else {
          this.type = '<img src="../PionCouleurs/general-blue.png" />';
        }
      }
    }

    class Eclaireurs extends Pion {
      constructor(color){
        super("eclaireur", 2, color);
        this.color = color;
        if(color == 'red'){
          this.type = '<img src="../PionCouleurs/scout-red.png" />';
        }
        else {
          this.type = '<img src="../PionCouleurs/scout-blue.png" />';
        }
      }

      Avancer(iDest,jDest,iDeb,jDeb,idDeb,idFin){
        if (plateau.plateau[iDest][jDest] == 1) {
          plateau.plateau[iDest][jDest] = plateau.plateau[iDeb][jDeb];
          plateau.plateau[iDeb][jDeb] = 1;

          let caseAvider = document.getElementById(idDeb);
          let caseAremplir = document.getElementById(idFin);

          caseAvider.innerHTML = '';
          caseAremplir.innerHTML = this.type;
      }
        /*----------- MOOV ECLAIREUR -----------*/
        if(check_moove_eclaireur(iDest, jDest)){
          // Fight de 2 éclaireurs OU Fight avec une bombe
          if((plateau[iDest][jDest].name == 'eclaireur' || plateau[iDest][jDest].lvl == 30) && this.color != plateau[iDest][jDest].color){
            plateau[iDest][jDest].nb_death ++;
            this.nb_death++;
            plateau[iDest][jDest] = 1;
            plateau[iDeb][jDeb] = 1;
          }
          // L'éclaireur perd
          else if(plateau[iDest][jDest].lvl > this.lvl && plateau[iDest][jDest].name != 'drapeau' && this.color != plateau[iDest][jDest].color){
            this.nb_death++;
            plateau[iDeb][jDeb] = 1;
          }
          // L'éclaireur gagne (que contre l'espionne)
          else if(plateau[iDest][jDest].name == 'espion' && this.color != plateau[iDest][jDest].color){
            plateau[iDest][jDest].nb_death++;
            plateau[iDest][jDest] = plateau[iDeb][jDeb];
            plateau[iDeb][jDeb] = 1;
            iDeb = iDest;
            jDeb = jDest;
          }
          // Il prend le drapeau
          else if(plateau[iDest][jDest].name == 'drapeau' && this.color != plateau[iDest][jDest].color){
            plateau[iDest][jDest].isTaken();
          }
        }
      }
    }

    class Sergents extends MovablePion {
      constructor(color){
        super("sergent", 4, color);
        this.color = color;
        if(color == 'red'){
          this.type = '<img src="../PionCouleurs/sergeant-red.png" />';
        }
        else {
          this.type = '<img src="../PionCouleurs/sergeant-blue.png" />';
        }
      }

    }

    class Lieutenants extends MovablePion {
      constructor(color){
        super("lieutenant", 5, color);
        this.color = color;
        if(color == 'red'){
          this.type = '<img src="../PionCouleurs/lieutenant-red.png" />';
        }
        else {
          this.type = '<img src="../PionCouleurs/lieutenant-blue.png" />';
        }

      }
    }

    class Capitaines extends MovablePion {
      constructor(color){
        super("capitaine", 6, color);
        this.color = color;
        if(color == 'red'){
          this.type = '<img src="../PionCouleurs/captain-red.png" />';
        }
        else {
          this.type = '<img src="../PionCouleurs/captain-blue.png" />';
        }

      }
    }

    class Commandants extends MovablePion {
      constructor(color){
        super("commandant", 7, color);
        this.color = color;
        if(color == 'red'){
          this.type = '<img src="../PionCouleurs/major-red.png" />';
        }
        else {
          this.type = '<img src="../PionCouleurs/major-blue.png" />';
        }

      }
    }

    class Colonels extends MovablePion {
      constructor(color){
        super("colonel", 8, color);
        this.color = color;
        if(color == 'red'){
          this.type = '<img src="../PionCouleurs/colonel-red.png">';
        }
        else {
          this.type = '<img src="../PionCouleurs/colonel-blue.png" />';
        }

      }
    }

    class Drapeau extends Pion{
      constructor(color){
        super("drapeau", 0, color);
        this.color = color;
        if(color == 'red'){
          this.type = '<img src="../PionCouleurs/flag-red.png" />';
        }
        else {
          this.type = '<img src="../PionCouleurs/flag-blue.png" />';
        }

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
        super("bombe", 30, color);
        this.color = color;
        if(color == 'red'){
          this.type = '<img src="../PionCouleurs/bomb-red.png" />';
        }
        else {
          this.type = '<img src="../PionCouleurs/bomb-blue.png" />';
        }

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
