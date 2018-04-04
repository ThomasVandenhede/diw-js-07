'use strict';

/**
* Les évènements
*/

// Utilisation des évènement existants :

window.onload = function(choucroute){
  // cette fonction est exécutée par le navigateur à la fin du chargement du document en mémoire
  
};
window.onmousemove = function(unObjetAvecLesInformationsRelativesALevenement){
  // cette fonction est exécutée par le navigateur lors d'un movement de la souris sur la fenêtre
  // window.console.log(unObjetAvecLesInformationsRelativesALevenement);
  /*
  var referenceALObjetQuiRepresenteDiv = window.document.getElementById('container');
  referenceALObjetQuiRepresenteDiv.style.position = 'absolute';
  referenceALObjetQuiRepresenteDiv.style.left = unObjetAvecLesInformationsRelativesALevenement.clientX + 'px';
  referenceALObjetQuiRepresenteDiv.style.top = unObjetAvecLesInformationsRelativesALevenement.clientY + 'px';
  */
};

// le navigeur exécute le code window.onmousemove({???}); lorsque la souris bouge

window.onclick = function(e) {
  e; // argument qu'on prévoit pour recevoir l'objet qui décrit les caractéristique de l'évènement. Ici on recevre un évènement de type mouseEvent : https://developer.mozilla.org/fr/docs/Web/API/MouseEvent
};

// Les fonctions qu'on utilise pour "gérer les évènement", on les appelle :
// Chez les rosbifs :
// - Event Handler
// - Event Listener
// Chez les grenouilles :
// - Gestionnaire d'évènement
// - Ecouteur d'évènement


window.addEventListener('click', function(e) {
 // Autre gestionnaire d'évènement.
    
});

window.addEventListener('click', function(e) {
 // Encore un autre gestionnaire d'évènement.
    
});

window.addEventListener('load', function(e) {
  //alert('load');
  
}, false);

window.addEventListener('DOMContentLoaded', function(evtChargement) {
  // Encore un autre gestionnaire d'évènement.
  var referenceALObjetQuiCorrespondAuLien = window.document.getElementById('lien');
  referenceALObjetQuiCorrespondAuLien.addEventListener('click', function(evtSouris){
    evtSouris.preventDefault(); // méthode qui empêche le comportement par défaut du navigateur.
  });
});

// Création d'évènements personnalisés

// Crée un nouvel evenement
var nouvelEvenement = new CustomEvent('banzai', {detail:{
  message: 'Banzaaiiiiii !'
}});


window.addEventListener('keydown', function(evtClavier) {
  //window.console.log(evtClavier);
  if (evtClavier.code === 'Enter' && evtClavier.altKey && evtClavier.ctrlKey) {
    // Ici je déclenche l'évènement si il est présent sur n'importe que sous objet de window
    window.dispatchEvent(nouvelEvenement);
  };
});

// Ajoute un gestionnaire d'évènement pour "banzai"
window.addEventListener('banzai', function(objetEvt){
  window.console.log('Ctrl+Alt+Entrée');
  console.log(objetEvt);
});

// On peut calculer un ratio pour determiner le facteur de redimensionnement de l'écran.
var ratio = window.innerWidth / window.innerHeight;
// On utilise l'évènement resize pour gérer chaque redimensionnement.
window.addEventListener('resize', function(objetEvt){
  ratio = window.innerWidth / window.innerHeight;
});



/*
* Mot-clé this et transferts
*/
var objet = {
  propriete: 'Dev JS 07',
  methode: function(){
    /* utiliser la closure
    var that = this;
    window.setTimeout(function(){
      window.alert(that.propriete);
    }, 1000);
    */

    /* utiliser la méthode .bind
    window.setTimeout(function(){
      window.alert(this.propriete);
    }.bind(this), 1000);
    */

    // utiliser une fonction flèche
    window.setTimeout(() => {
      window.alert(this.propriete);
    }, 1000);
    // permet de faire en sorte que this pointe sur l'objet d'origine de la méthode plutôt que l'objet dans lequel la méthode sera exéxcutée.
  }
}

objet.methode();

/**
* Retour sur les objets 
*/
// Accessibilité des propriétés d'un objet
var MI6 = function(prenom, nom, code){
  // variables qui existent à l'intérieur des instances
  var prenom = prenom;
  var nom = nom;
  
  // variables accessibles depuis l'exterieur des instances
  this.code = code;

  // getter : méthodes qui permettent d'obtenir la valeur d'une variable définie à l'intérieur d'un instance
  this.recupereNom = function(){
    return nom;
  }

  this.recuperePrenom = function(){
    return prenom;
  }
};

// les méthodes peuvent utiliser les variables qui existent à l'intérieur des instances.
MI6.prototype.methode = function(){
  window.alert('My Name is ' + this.recupereNom() + ', ' + this.recuperePrenom() + ' ' + this.recupereNom() + ' !');
}

var agentSecret = new MI6('James', 'Bond', '007');

agentSecret.nom; //undefined
agentSecret.code; //007
agentSecret.methode(); //'My name is Bond, James Bond !'

// Design pattern fonction usine :
// Une fonction qui retourne un objet :
/** Construction détaillée d'une fonction usine
var donneMoiLaFonctionUsine = function(){
  // Fonction constructeur
  var ConstructeurDeVoiture = function(a, b, c) {
    this.modele = a;
    this.marque = b;
    this.couleur = c;
  };

  ConstructeurDeVoiture.prototype.roule = function(){
    window.alert('Vrooooooom !');
  };

  // Fonction usine (doit retourner un objet)
  var usineDeVoitures = function(x, y, z){
    var uneVoiture = new ConstructeurDeVoiture(x, y, z);
    return uneVoiture;
  }

  return usineDeVoitures;
};
**/
/** Construction synthétique **/
var monUsineDeVoiture = function(){
  // Fonction constructeur
  var ConstructeurDeVoiture = function(a, b, c) {
    this.modele = a;
    this.marque = b;
    this.couleur = c;
  };

  ConstructeurDeVoiture.prototype.roule = function(){
    window.alert('Vrooooooom !');
  };

  // Fonction usine (doit retourner un objet)
  return function(x, y, z){
    return new ConstructeurDeVoiture(x, y, z);
  };
}();

// Fabrication de voiture :
var voiture1 = monUsineDeVoiture('R5', 'Renault', 'Blanche');
var voiture2 = monUsineDeVoiture('Golf', 'VolksWagen', 'Orange');

voiture1.roule(); // affiche 'Vrooooooom !'





















































