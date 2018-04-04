'use strict';

/**
* Le 5ème (element) type de données :
* LES OBJETS ET LE PROTOTYPAGE
*/

// Objets Littéraux : Notation Objet JavaScript (JSON)

{}; // Objet de base
[]; // Objet de type Array (=> Array est un sous-type d'objet)

// Un objet contient de propriétés et des méthodes.
({
  propriete1: 56, // propriété de l'objet
  propriete2: function(){}, // propriété qui contient une fonction s'appelle une METHODE de l'objet.
  propriete3: true,
  propriete4: [{
    propriete1: 'ici !'
  }]
});
 
// On peut affecter une référence à l'objet à une variable.

var referenceVersUnObjet = {
  propriete1: function(){},
  propriete2: [{
    propriete1: 'ici !'
  }],
  'Don Diego De La Vega': 'Zoorrrrrooo !'
};

// On peut copier la référence MAIS PAS l'objet
var autreReferenceVersLeMemeObjet = referenceVersUnObjet;

referenceVersUnObjet.propriete3 = true;
autreReferenceVersLeMemeObjet.propriete3; // true

// Accès au propriétés et aux méthodes :

// On peut utiliser le .
referenceVersUnObjet.propriete1; //function(){}
referenceVersUnObjet.propriete1(); // exécute function(){}
// On peut également les []
referenceVersUnObjet['propriete1']; //function(){}
referenceVersUnObjet['propriete1'](); // exécute function(){}

// Particularité des méthodes :
// Utilisation possible du mot-clé this
var referenceAUnAutreObjet = {
  proprieteA: 'Au Revoir !',
  proprieteB: {
    propriete1: function(){
        this; // ce mot-clé n'a de sens qu'à l'intérieur d'une méthode. C'est à dire qu'à l'intérieur d'une fonction DANS un objet.
        this; // pointe vers l'objet dans lequel se trouve la méthode dans laquelle le mot-clé est utilisé.
        this.propriete2; // 'Bonjour !'
        // Attention le mot-clé this ne point pas sur des propriété d'objet contenant l'objet vers lequel pointe this.
        this.proprieteA; // undefined 
    },
    propriete2: 'Bonjour !'
  }
};

// Objets obtenus à partir de fonctions constructeur
// Une fonction constructeur est une fonction. Elle différe des fonctions usuelles par son utilisation. Elle n'est pas écrite pour être exécutée. Elle sera utilisée pour créer une instance d'objet à l'aide du mot clé new.

// Cette fonction constructeur PERMETTRA de créer des jouets.
var FabricantDeJouet = function(){
  this.prix = 'Cher'; // Un jouet aura SON.PRIX
  this.dureeDeVie = 'Court'; // Un jouet aura SA.DUREEDEVIE
  this.magasin = 'La Grande Récré'; // Un jouet aura SON.MAGASION
  this.boutonPoussoir = function(){ // Un jouet aura SON.BOUTONPOUSSOIR
    window.alert('Musique assourdissante pour les parents !');
  }
};

// Par convention, le nom des fonctions constructeur commence par une MAJUSCULE .

// On peut créer des objets à l'aide de la fonction constructeur qui précéde en utilisant le mot-clé new. Ce mot clé ne s'utilise QU'AVEC les fonction constructeur.
var jouet1 = new FabricantDeJouet();
var jouet2 = new FabricantDeJouet();
var jouet3 = new FabricantDeJouet();

/**
* Objets Fondamentaux : mis à disposition par le moteur
*/

// Les fonctions constructeur fondamentales

// Par ex: 
Date; // fonction constructeur pour fabrique un objet représentant une date
new Date(); // création d'un nouvel objet date

// Les objet fondamentaux
// Par ex:
Math; // objet qui contient plusieurs propriétés et méthodes pour effectuer des calcul mathématiques
Math.PI; // propriété de Math qui contient le nombre PI (3.14...)

// LA COERCITION :

// Lorsqu'un type primitif est utilisé comme un objet, le MOTEUR crée une nouvel instance d'un objet du type associé le temps de l'instruction.
// Exemple :
(1).toString(); // ici j'utilise le nombre 1 "comme" un objet
// le moteur effectue : 
(new Number(1)).toString(); // la coercition créer une nouvelle instance de la fonction constructeur Number pour pouvoir exécuter la méthode toString().

// ATTENTION LA COERCITION NE SE PRODUIT QUE SUR LES TYPES PRIMITIFS :
/*
  - Les nombres avec Number
  - Les boolééns avec Boolean
  - Les chaînes de caractères avec String
  - Les fonctions avec Function
*/

// AUTRES FONCTION CONSTRUCTEUR FONDAMENTALES (ne sont pas utilisées par la coercition parceque ne concernent pas des type primitifs)
{}; // équivaut à new Objet(); 
[]; // équivaut à new Array();

// En JAVASCRIPT les fonctions sont en fait un peu particulière :
// Elle sont considéré par le moteur comme des FONCTIONS mais aussi et en même temps comme des OBJETS.

/**
* Le Prototypage
*/

// Soit on utilise l'objet/la fonction fondamentale Object et sa méthode .create()

var darkVador = {
  prenom: 'Dark',
  nom: 'Vador',
  caractere: 'Sombre',
  rang: 'Seigneur',
  repliqueQuiTue: function(){
    window.alert('Je suis... kshksh.. ton père !');
  }
};

var fils = Object.create(darkVador);
// fils contient une reference à une objet dans le prototype est l'objet correspondant à Dark Vador.
fils.prenom; // 'Dark'
fils.prenom = 'Luke';
fils.caractere = 'Premier de la classe';
fils.rang = 'Chevalier';
fils.repliqueQuiTue = function(){
  window.alert('Naaaaan ce n\'est pas vrai !');
};

// Soit on utilise la propriété .prototype des objets/fonctions
var gizmo = {
  taille: 'petit',
  yeux: 'grands',
  aDeLaFourrure: true,
  caractere: 'Doux',
  seDodeline: true,
  prenom: 'Gizmo',
  espece: 'Mogwai',
  cri: function(){
    window.alert(this.espece + ' !');
  }
};

var CarafeDEau = function (){
  this.prenom = '';
  this.seDodeline = false;
  this.caractere = 'Pervers';
  this.mangeDuPoulet = function(){
    this.taille = 'grand';
    window.alert('Gniark gniark gniark !');
  }
}
// On définit l'objet referencé dans gizmo comme prototype
CarafeDEau.prototype = gizmo;

// On créé des Gremlins
var gremlins1 = new CarafeDEau();
var gremlins2 = new CarafeDEau();
var gremlins3 = new CarafeDEau();

gremlins2.caractere;// 'Pervers' => valeur qui est obtenue depuis l'objet lui-même (le gremlins).
gremlins2.yeux; // 'grands' => valeur qui est obtenue depuis le prototype de l'objet (ici gizmo).

/**
* Design pattern fonction constructeur
*/

// Toujours mettre les méthodes dans le prototype de la fonction constructeur
var ConstructeurDeVoiture = function(a, b, c){
  this.modele = a; // un texte
  this.marque = b; // un texte
  this.carburant = c; // un nombre
}

ConstructeurDeVoiture.prototype.roule = function(){
  this.carburant--;
}
ConstructeurDeVoiture.prototype.accelere = function(){
  this.carburant = this.carburant - 5;
}
ConstructeurDeVoiture.prototype.klaxonne = function(){
  window.alert('Tuuut tuuut !');
}

var voiture1 = new ConstructeurDeVoiture('R5', 'Rono', 100);
var voiture2 = new ConstructeurDeVoiture('XD', 'Citrono Pipo', 120);
var voiture3 = new ConstructeurDeVoiture('Curling', 'La Voiture Du Peuple', 90);

/**
* Design pattern fonction usine (fonction constructeur + IFE)
*/
var fonctionUsine = (function(){
  var Constructeur = function(x){
    this.unePropriete = x;
  }

  Constructeur.prototype.uneMethode = function(){
    window.alert(this.unePropriete);
  }

  return function(x){
    return new Constructeur(x);
  }
}());

var objet1 = fonctionUsine('Hello World !');
var objet2 = fonctionUsine('Bonjour le Monde !');
var objet3 = fonctionUsine('Hola El Mundo !');

/**
* Quelques structures syntaxiques
*/

// Boucler à travers toutes les propriétés d'un objet
var unObjet = {
  a: 10,
  b: 20,
  c: 30,
  d: 40
};

// for ... in ...
for (var nomPropriete in unObjet) {
  nomPropriete; // successivement 'a', 'b', 'c', 'd'
  unObjet[nomPropriete]; // successivement 10, 20, 30, 40
}

// Boucler à travers les propriétés d'un objet sans celles de son prototype
var filsDeUnObjet = Object.create(unObjet);
filsDeUnObjet.x = 'dix';
filsDeUnObjet.y = 'vingt';
filsDeUnObjet.z = 'trente';
// méthode de Object : .hasOwnProperty()
filsDeUnObjet.x; // 'dix'
filsDeUnObjet.hasOwnProperty('x'); // true, x appartient à l'objet lui-même
filsDeUnObjet.a; // 10
filsDeUnObjet.hasOwnProperty('a'); // false, a appartient au prototype de l'objet

for (var nomPropriete in filsDeUnObjet) {
  nomPropriete; // successivement 'a', 'b', 'c', 'd', 'x', 'y', 'z'
  if (filsDeUnObjet.hasOwnProperty(nomPropriete)) {
    nomPropriete; // successivement 'x', 'y', 'z'
    filsDeUnObjet[nomPropriete]; // successivement 'dix', 'vingt', 'trente'
  }
}

/**
* Le Modèle Objet du Document : Le DOM
*/
// L'objet global :
window; // contient des propriétés et méthodes relatives à l'onglet courant.
window.alert(); // méthode qui affiche une boite de dialogue.
window.prompt(); // méthode qui affiche une boite de dialogue.
window.open(); // méthode qui ouvre une nouvelle fenêtre.
window.setTimeout(function(){}, 1000); // méthode qui exécute une fonction à l'issu d'un compte à rebours, ici 1 sec.
// ...

// L'objet document :
window.document; // contient des propriétés et des méthodes relatives au document affiché dans l'onglet
window.document.body; // contient une reference à l'objet qui correspond à la balise body lue dans le document HTML source.

/**
* Aspect Evenementiel du langage
*/
// Des mécanismes sont prévus dans le DOM pour faire en sorte que le navigateur exécute du code en réaction à :
// - Des actions de l'utilisateur (click, survol de souris, touche enfoncée, etc...)
// - Des changement d'état du système (chargement terminé, fenêtre redimensionnée, ...)

// Par exemple
window.onload; // Cette propriété de window peut accueillir une fonction qui sera exécutée par le navigateur lorsque le DOM sera entièrement chargé en mémoire. window.onload est une METHODE de window.

window.onload = function() {
  window.document.body.style.backgroundColor = 'pink';

  this; // correspond à window
  this.alert();

  window.document.body.children[0].onclick = function(){
    this; //correspond à l'objet dans lequel se trouve la méthode courante.
    this.style.color = 'blue';

    // La méthode window.document.getElementById() retourne une référence à l'objet dont l'identifiant correspond à la chaine de caractère fourni en paramétre
    // Ex :
    var uneReferenceALObjetCorrespondantAuParagrapheDontLIdEstMonP = window.document.getElementById('monP');
    uneReferenceALObjetCorrespondantAuParagrapheDontLIdEstMonP.style.color = 'yellow';

    // La méthode window.document.getElementsByTagName() permet d'obtenir un tableau contenant toutes les références objets correspondant à au nom de balise fourni en paramétre de la méthode.
    var tableauDObjetCorrespondantATousLesP = window.document.getElementsByTagName('p');
    for (var i = 0; i < tableauDObjetCorrespondantATousLesP.length ; i++) {
      tableauDObjetCorrespondantATousLesP[0].style.fontWeight = 'bold';
    }
    // On a énormement de méthodes utilitaires disponibles dans le DOM. Voir MDN.
  }

};











