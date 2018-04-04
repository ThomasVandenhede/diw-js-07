'use strict';

var boite; // emplacement pour écrire et lire autant de fois qu'on veut
// const boite; // emplacement ou ne peut écrire qu'1 fois

// Chaines de caractères (String)
'Bonjour les Dev JS';

// Nombres (Number)
35; // Entier
3.5; // Decimal
0.2; // Un autre décimal
.2; // Encore un...
NaN; // Un nombre qui n'en est un ou pas mais en fait si
Infinity; // L'infini obtenu après une division par zero

// Boolean
true;
false;

2 === 3; // false

// Fonction
(function () {
  ;;;;;;;;;;
})

// Objets
{}; // Objet en Notation Objet JavaScript (JSON)
[]; // Un type d'objet (type Array) en JSON
null; // Objet vide

// Inclassable
undefined

/* Les Objets */
/* Création en notation littéral */
var mesEtageresbilly = {
  etagereDuHaut: 'Des guide de voyage qui me servent pas mais c\'est juste pour dire que je suis déjà sorti du quartier',
  etagereDuMilieu: 'Des Bédés que ma femme n\'aime pas mais ça m\'amuse de l\'embeter...', // ceci est une propriété qui contient une chaîne
  etagereDuBas: { // ceci est une propriété qui contient un objet
    derriereLaPorte: 'Les papiers impôts que du coup je ne vois pas'
  },
  ouvrirLaPorte: function() { // une propriété qui contient une fonction s'appelle une méthode
    alert('Aaaaaaaaah ma fille à grandi... tout est ravagé !');
    this; // A UTILISER UNIQUEMENT DANS LES METHODE (DANS LES FONCTIONS QUI SONT DANS DES OBJETS).
    this.etagereDuBas.derriereLaPorte = 'patatras !';
    this['etagereDuMilieu'];
  }
};
// Un objet contient des propriétés qui contiennent des valeurs
// Un objet contient des méthodes (une méthode c'est une propriété qui contient une fonction)

mesEtageresbilly['etagereDuMilieu']; // pointe sur l'emplacement etagereDuMilieu dans mon objet
mesEtageresbilly.etagereDuMilieu; // pointe sur l'emplacement etagereDuMilieu dans mon objet
mesEtageresbilly.etagereDuBas.derriereLaPorte; // pointe sur l'emplacement derriereLaPorte qui dans l'objet qui est dans l'emplacement etagereDuBas qui est dans l'objet mesEtageresbilly.
mesEtageresbilly['etagereDuBas']['derriereLaPorte']; // pointe sur le même emplacement qu'à la ligne précédente.

mesEtageresbilly.ouvrirLaPorte();
mesEtageresbilly['ouvrirLaPorte']();


// Les objets ne peuvent être copiés par affectation.
// Ils sont uniques. Un objet n'existe qu'1 fois à un emplacement mémoire
// Ici je copie non pas l'objet mais la REFERENCE à l'objet
var lesEtageresDeAudrey = mesEtageresbilly;

// Modifier l'objet reférencé dans la variable lesEtageresDeAudrey est la même que de modifier l'objet référencé dans la variable mesEtageresbilly.
lesEtageresDeAudrey.etagereDuHaut = 'Des livres d\'architecture !';

/* Création d'objet à l'aide de fonctions contructeur */
// Déclaration de fonction constructeur
var BouyguesConstruction = function(){
  this.salon = '';
  this.cuisine = 'Equipements ménagers';
  this.cave = '';
  this.toilette = '';
  this['chambres'] = '';
  this[6] = 'ici six'; 
  this.sonnette = function() {
    alert('Driiiiiiiiiiiiiiiiiiiiing !');
  }
};

//Utilisation d'une fonction constructeur
// Mot clé : new
var maison1 = new BouyguesConstruction();
var maison2 = new BouyguesConstruction();
var maison3 = new BouyguesConstruction();
var maison4 = new BouyguesConstruction();
var maison5 = new BouyguesConstruction();
var maison6 = new BouyguesConstruction();

maison5.sonnette();
maison4['sonnette']();
maison2.cave = 'Cadavre cachés derrière le mur du fond';

























