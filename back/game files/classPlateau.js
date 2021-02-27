class Plateau {
  constructor(lignes,colonnes) {
    this.lignes = lignes;
    this.colonnes = colonnes;

    //Initialisation d'un plateau lignes x colonnes :
    this.plateau = new Array(this.lignes);

    for (let i = 0 ; i < this.plateau.length ; i++){
      this.plateau[i] = new array(this.colonnes);
    }
  }
    //Création des 2 lacs 4x4 :
    lacs(){
    for (let i = 0 ; i < 2 ; i++){
      this.plateau[4+i][2] = -1;
      this.plateau[4+i][6] = -1;
      for (let j = 0 ; j < 2 ; j++){
        this.plateau[4+i][3] = -1;
        this.plateau[4+i][7] = -1;
      }
    }
  }

}
let plateau = new Plateau(10,10);
plateau.lacs;
console.log(plateau);
