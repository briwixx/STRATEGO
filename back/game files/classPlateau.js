class Plateau {
  constructor(lignes,colonnes) {
    this.lignes = lignes;
    this.colonnes = colonnes;

    //Initialisation d'un plateau lignes x colonnes :
    this.plateau = new Array(this.lignes);

    for (let i = 0 ; i < this.plateau.length ; i++){
      this.plateau[i] = new Array(this.colonnes);
    }

    //Remplissage tableau avec des 1 :
    for(let i = 0 ; i < this.lignes ; i++){
      for (let j = 0; j < this.colonnes ; j++){
        this.plateau[i][j] = 1;
      }
    }
    //Création des 2 lacs 4x4 avec des 0:
    for (let i = 0 ; i < 2 ; i++){
      this.plateau[4+i][2] = 0;
      this.plateau[4+i][6] = 0;
      for (let j = 0 ; j < 2 ; j++){
        this.plateau[4+i][3] = 0;
        this.plateau[4+i][7] = 0;
      }
    }
  }
}
let plateau = new Plateau(10,10);
