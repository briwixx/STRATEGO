let check = new Array();
let countR = 0;

function randomPlacement(player){
  let i = 0;
  let boutonsAplacer = 1;

  while (boutonsAplacer.length !=0){
    if(player.color == 'red'){
      boutonsAplacer = document.getElementsByClassName('BoutonPion redbtn')
    }
    else if(player.color == 'blue'){
      boutonsAplacer = document.getElementsByClassName('BoutonPion bluebtn')
    }

    i = Math.floor(Math.random() * 40);
    console.log(i);
    for (let j = 0 ; j < check.length ; j++){
      if (i == check[j]){
        console.log('Pion déja placé');
        return randomPlacement(player);
      }
    }
    check.push(i);

    player.randPlacementPion(player.pionsJoueur[i], i, plateau, player.color);

  }
  console.log('tous les pions du joueur ' + player.color + " sont placés");

  //on vide le tableau check
  check.splice(0,40);
}
