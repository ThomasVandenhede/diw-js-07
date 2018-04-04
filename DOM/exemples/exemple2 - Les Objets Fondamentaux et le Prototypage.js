'use strict';

// Nombres : Number
23;
0.6
.2;
Infinity;
NaN;

// Booléens: Boolean
true;
false;

// Chaînes de Caractères : String
'Bonjour !';
"Bonjour !";
`Bonjour !`; // EcmaScript 6 uniquement

// Fonctions : Function
(function(argument){
  ;;;;; // instructions
});

var maFonction = function vaMeChercherUnCafe(){
  return 'Un expresso';
};

var monCafe = maFonction();

monCafe; // contient 'Un expresso'

// Les Objets

/**
* Déclaration littérale :
*/
{}; // objet vide
[]; // objet vide (de type Array => indéxé => numéroté)
null; // objet nul

var obj = {
  propriete1: 45,       // propriété : "variable" dans un objet
  propriete2: 'Hello !',
  propriete3: true,
  propriete4: function(){
    this; // mot clé à utiliser uniquement dans les méthodes
    // "this" fait référence à l'objet contenant la méthode
    this.propriete2; // 'Hello !'
    return 'j\'arrive de l\'intérieur d\'un objet';
  }, // fonction dans une propriété : une méthode
  propriete5: [false, {
    propriete1: 54,
    propriete2: function(){
      this; // "this" fait référence à l'objet contenant la méthode
      this.propriete1; // 54
    }
  }],
  "propriété": 'Nom illégal'
};

// Accès au propriétés et aux méthodes :
obj.propriete5[1].propriete2; // la (fonction) méthode
obj.propriete5[1].propriete2(); // exécution de la (fonction) méthode

// ou alors

obj['propriete5'][1]['propriete2']; // la (fonction) méthode
obj['propriete5'][1]['propriete2'](); // exécution de la (fonction) méthode

// Créer une propriété à postériori
obj.propriete6 = 'Une information ajoutée après la création de l\'objet';

// ou

obj['propriété sept !'] = 'Une information ajoutée après la création de l\'objet'; 

/**
* Déclaration à partir de Fonctions Constructeur :
*/
// Une fonction constructeur est une fonction qui permet de créer des instances (des objets)
// Déclaration de Fonction Constructeur
var FabricantDeRobotDisonaure = function(informations){
  this.nom = 'Robotsaure X3000';
  this.prix = informations.prix;
  // Façon verbeuse (style guerre et paix)
  /*if (r) {
    this.revendeur = informations.revendeur;
  } else {
    this.revendeur = 'usine';
  }*/
  // Equivalent à :
  // Façon courte (style jean claude van damme)
  this.revendeur = informations.revendeur || 'usine'; // propriété avec valeur par défaut
  this.garantie = false;
}
// Déporter une méthode du contructeur dans son prototype
// pour optimiser l'utilisation de la mémoire.
FabricantDeRobotDisonaure.prototype.appuiBouton = function(){
  return 'GRooooaaaaaar !';
}

// Par CONVENTION on met la première lettre du nom 
// d'une fonction constructeur en majuscule.

// Utilisation avec le mot clé "new"
var jouet1 = new FabricantDeRobotDisonaure({
  prix: 119.99,
  revendeur: 'amazon'
});
jouet1.revendeur; // 'amazon'

var jouet2 = new FabricantDeRobotDisonaure({
  prix: 129.99,
  revendeur: 'la grande récré'
});
jouet2.revendeur; // 'la grande récré'

var jouet3 = new FabricantDeRobotDisonaure({
  prix: 179.99,
  revendeur: 'auchan'
});
jouet3.revendeur; // 'auchan'

var jouet4 = new FabricantDeRobotDisonaure({
  prix: 109.99
});
jouet4.revendeur; // 'usine'

/**
* Objet Fondamenux
*/

/** Pour la Coercition **/

// Les fonctions constructeur de "coercition"
// Ces fonctions sont très rarement utilisée par les développeur.
// C'est le moteur JavaScript qui les utilise pour obliger un type primitif à devenir un objet (d'où la notion de coercition.

// La fonction constructeur Number est utilisé pour obliger un nombre à devenir un objet le temps d'une instruction.

// Par exemple :

// Pour les Nombres : Number
// Quand le développeur écrit :
(1.6).toString(); // retourne "1.6"
// Le moteur JavaScript éxecute :
// (la coercition équivalente)
(new Number(1.6)).toString(); // retourne "1.6"

// Pour les Chaîne : String
// Quand le développeur écrit :
'TEXTE EN MINUSCULE'.toLowerCase(); // Quand le développeur écrit :
// Le moteur JavaScript éxecute :
// (la coercition équivalente)
(new String('TEXTE EN MINUSCULE')).toLowerCase(); // retourne "texte en minuscule"

// Pour les Booléens : Boolean
// Quand le développeur écrit :
(true).toString(); // retourne "true"
// Le moteur JavaScript éxecute :
// (la coercition équivalente)
(new Boolean(true)).toString(); // retourne "true"

// Pour les Fonctions : Function
// Quand le développeur écrit :
(function() {
  ;;;
}).toString(); // retourne "function() {;;;}"
// Le moteur JavaScript éxecute :
// (la coercition équivalente)
(new Function(';;;')).toString(); // retourne "function() {;;;}"

/** Autres fonctions constructeur (qui ne participent PAS a là coercition **/
// Fonction constructeur Array
var liste = ['rutabagas', 'panais', 'patisson'];
// Est la notation raccourcie pour 
liste = new Array('rutabagas', 'panais', 'patisson');

// Fonction constructeur Object
var objet = {propriete1: 'Hello !', propriete2: 'Bonjour !', propriete3: 'Salam'};
// Est la notation raccourcie pour 
objet = new Object({propriete1: 'Hello !', propriete2: 'Bonjour !', propriete3: 'Salam'})

/**
* Le Prototypage
*/

var ancetre = {
  nom: 'Mathusalem',
  prenom: 'Robert',
  hobby: 'Scrabble'
};


// Création d'un héritage avec :
// 1 - SOIT avec l'objet fondamental Object en utilisant la méthode .create()

// Le 2ème argument est un objet "de définition de propriété". En d'autre termes c'est un objet qui doit contenir les propriétés qui sont définies dans la document ici : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/defineProperties
var enfant1 = Object.create(ancetre, {
  prenom: {
    value: 'Junior',
    writable: false, // modifiable
    configurable: true, // effaçable
    enumerable: true // parcourable
  }
});

var enfant2 = Object.create(ancetre, {
  prenom: {
    value: 'Sally',
    writable: true, // modifiable
    configurable: true, // effaçable
    enumerable: true // parcourable
  }
});

// Le deuxième argument est optionnel (il est entre [] dans la documentation).
// On peut créer l'enfant sans propriété propre MAIS à partir de son prototype.
var enfant3 = Object.create(ancetre);
// Et définir les propriété propres de l'enfant à postériori
enfant3.prenom = 'Paul';

// 1 - SOIT à l'aide de la propriété .prototype des Fonctions Constructeur
var Maman = function (p){
  this.prenom = p;
}

// La propriété .prototype est documentée ici : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function/prototype
Maman.prototype = ancetre;

enfant1 = new Maman('Junior');
enfant2 = new Maman('Sally');
enfant3 = new Maman('Paul');