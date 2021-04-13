function randomPlacement(player){
  console.log("placement aléatoire appelé pour le joueur "+player.color);
  let count = 0;
  let i = 0;
  let check = [];
  while (count < player.pionsJoueur.length){

    i = Math.floor(Math.random() * player.pionsJoueur.length-1);

    for (let j = 0 ; j < check.length ; j++){
      if (i == check[j]){
        console.log('Pion déja placé');
        return randomPlacement(player);
      }
    }
    check.push(i);
    player.randPlacementPion(player.pionsJoueur[i], i, plateau, player.color);
    count++;
  }
}
