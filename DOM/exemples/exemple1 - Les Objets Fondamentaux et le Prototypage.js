'use strict';

var boite = {};

// On peut ajouter des propriétés et des méthodes à lobjet à posteriori
// C'est à dire après avoir déclaré l'objet, par exemple :
boite.enHaut = '!!!';
boite.enBas = '???';
boite.cetteAnneeLa= function(){
  alert('Tout le monde est avec moi !');
};

// Pour supprimer une propriété d'un objet (mot clé delete) :
delete boite.enBas;

// On peut utiliser des caractères spéciaux pour nommer les propriétés
var cocorico = {};
cocorico['vive la république'] = 'Sur le fronton des mairies';
cocorico['vive la république']; // contient 'Sur le fronton des mairies'

/* Exemple de Références circulaires */
var enterprise = {
  nom: 'USS Enterprise'
};

var kirk = {
  prenom: 'Capitaine',
  nom: 'Kirk',
  vaisseau : enterprise
};

var spock = {
  prenom: 'Jean-Michel',
  nom: 'Spock',
  vaisseau : enterprise
};

enterprise.equipage = [kirk, spock];

// Pointe sur 'USS Enterprise' :
enterprise.nom;
// Pointe également sur 'USS Enterprise' :
enterprise.equipage[1].vaisseau.equipage[1].vaisseau.equipage[0].vaisseau.nom;


/* Fonction constructeur */
// Fonction constructeur avec arguments
var PlatEnSauce = function(x, y, z){
  this.viande = x; // propriété du contructeur
  this.legume = y; // propriété du contructeur
  this.condiment = z; // propriété du contructeur
  this.gras = 'Beaucoup'; // propriété fixe
  this.autreCondiment; // propriété vide
};

var obj1 = new PlatEnSauce('Boeuf', 'Carottes', 'Vin rouge');
var obj2 = new PlatEnSauce('Poulet', 'Carottes', 'Creme');
var obj3 = new PlatEnSauce('Saucisse', 'Choux', 'Poivre');

// Création d'objets 
/* Notation littérale */
{}; // => créé {} 

/* Fonction constructeur */
var Constructeur = function(){}
new Constructeur(); // => créé {}

// Objets Fondamentaux :

// Ex (Objet) :
Math; // Un objet fondamental du langage.
Math.PI; // Une propriété de cet objet.
Math.random(); // Une méthode de cet objet.
// Ex (Fonction Constructeur) :
var date = new Date(); // fourni un objet qui réprésente la date du jour
date.getDay(); // donne le numéri du jour de la semaine
var futur = new Date(2022, 12, 12, 12, 0); // fourni un objet à la date du 12 janvier 2023 à 12:00
futur.toString();

//
var texte = 'Ceci est un long texte !';
var objetAPartirDuTexte = new String(texte);
objetAPartirDuTexte.length; // contient la taille du texte
objetAPartirDuTexte.toUpperCase(); // donne le texte en majuscule

// Quand j'écris :
'Ce texte'.toUpperCase(); 
// Le moteur javascript voit
(new String('Ce texte')).toUpperCase();

// Ce mécanisme s'appelle la coercition. La syntaxe qui oblige à considérer un type de données comme un autre type.

// Les fonctions constructeur de coercition :
String; // transforme les chaine de caractère en Objet.
Number; // transforme les nombres en Objet.
Boolean; // transforme les boolééns en Objet.
Function; // transforme les fonctions en Objet.

// Les autres fonctions constructeur
Object; // Utilisable pour créer un objet à la place de {}
Array; // Utilisable pour créer un tableau à la place de []

// Ex :
var objDeTypeTab = [1, 'Hello', false];
// équivaut
var autreObjDeTypeTab = new Array(1, 'Hello', false);

autreObjDeTypeTab.length; // contient la longueur du "tableau"
autreObjDeTypeTab.sort();

/* Le Prototypage */
// Ex avec Object.create() :
var lapinPrehistorique = {
  taille: 'enorme',
  aUneFourrure: true,
  aDesDentsDeSabre: true,
  mangeDesCarottes: function(){
    alert('Grrroarrrr !');
  },
  cri: function(){
    alert('Gnaaaarl !');
  }
};
// Création d'un lapinContemporain à partir du lapin préhistorique
var lapinContemporain = Object.create(lapinPrehistorique);

lapinContemporain.taille = 'petit';

lapinContemporain.aDesDentsDeSabre = false;

lapinContemporain.cri = function() {
  alert('Squiiiik');
}


var lapinDuFutur = Object.create(lapinContemporain);

lapinDuFutur.taille = 'rikiki';
lapinDuFutur.mangeDesCarottes = function(){
  alert('Avec plaisir très cher !');
}

// Ex avec la propriété .prototype des fonction/objets :
var starwarsLeFilm = {
  dateDeSortie: 1974,
  titre: 'A New Hope',
  casting: [
    'Mark Hamill',
    'Carrie Fisher',
    'Harrison Ford'
  ]
};

var GeorgeLucas = function(t, d) {
  this.titre = t;
  this.dateDeSortie = d;
}

GeorgeLucas.prototype = starwarsLeFilm;

var encoreUnStarWars = new GeorgeLucas('L\'empire contre attaque', 1980);
var encoreUnAutreStarWars = new GeorgeLucas('Le retour du Jedi', 1983);





















