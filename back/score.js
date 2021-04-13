function $_GET(param) {
    let vars = {};
    window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if ( param ) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}


if($_GET('h') != null)
{
    let pseudo_w = $_GET('name_w'), pseudo_l = $_GET('name_l'),
        time_hour = $_GET('h'), time_min = $_GET('min'), time_sec = $_GET('sec'),
        nb_w = $_GET('nb_w'), nb_l = $_GET('nb_l'),
        time_w = $_GET('time_w'), time_l =  $_GET('time_l'),
        score_w = $_GET('score_w'), score_l = $_GET('score_l');

    let time = document.getElementById("time");
    time.innerHTML=time_hour+" :"+time_min+" :"+time_sec;

    let pwinner = document.getElementById("pwinner");
    pwinner.innerHTML =pseudo_w;
    let scoreW = document.getElementById("ScoreW");
    scoreW.innerHTML ="Score : "+ score_w;
    let nbW = document.getElementById("NbW");
    nbW.innerHTML ="Nombre de morts : "+ nb_w;

    let plooser = document.getElementById("plooser");
    plooser.innerHTML =pseudo_l;
    let scoreL = document.getElementById("ScoreL");
    scoreL.innerHTML ="Score : "+ score_l;
    let nbL = document.getElementById("NbL");
    nbL.innerHTML ="Nombre de morts : "+ nb_l;

}

let tab = [                                                     //Joueur fictif
    {name:'Alexis', score:'15001'}, {name:'Jean', score:'3400'},
    {name:'Pierre', score:'200'}, {name:'Jack', score:'3'},
    {name:'Gertrude', score:'10000'}, {name:'Antoinette', score:'5000'},
    {name:'Leonie', score:'987'},]

if($_GET('h') != null){
    tab.push({name: pseudo_w, score: score_w }); // Ajout des joueur actuelle
    tab.push({name:pseudo_l, score:score_l});
}


tab.sort(function (a,b){ //Tri des scores
    return b.score-a.score;
})

// Display du tableau

function DisplayLine(id) // Affichage d'une ligne de composent
{
    let tabcell = [];
    let rang = id+1;  // Tableau avec le texte a afficher
    tabcell.push(rang);
    let name = tab[id]['name'];
    tabcell.push(name);
    let score = tab[id]['score'];
    tabcell.push(score);

    var row = document.createElement("tr"); // Creation d'une balise tr

    for(let i=0; i<3; i++)      // Boucle de creation de balise td + à l'interieur text du tableau
    {
        let text = tabcell[i]
        var cell = document.createElement("td");
        var cellname = document.createTextNode(text);
        cell.appendChild(cellname);                 //Inclusion des balises texte dans td
        row.appendChild(cell);                      //Inclusion des balises td dans tr
    }

    return row;
}

function DisplayTab() // Affiche le tableau complet
{
    let table = document.getElementById("tabliau"); // Recherche du noeud de l'insertion des balises tr

    for(let i=0; i<9; i++)             // Boucle affichage des lignes
    {
        let row = DisplayLine(i);
        table.appendChild(row);         // Inclusion des balises tr dans la table
    }
}
DisplayTab();
