'use strict';
/**
* Design Pattern : Fonctions Usines
*/
var usineABonhommes = (function(){
  // Déclaration de la Fonction Constructeur
  var ConstructeurDeBonhomme = function(n, p, a){
    this.nom = n;
    this.prenom = p;
    this.age = a;
    this.energie = 100;
  }

  // Ajout des méthodes au prototype de la Fonction Constructeur
  ConstructeurDeBonhomme.prototype.marcher = function(){
    this.energie--;
  }

  ConstructeurDeBonhomme.prototype.courir = function(){
    this.energie = this.energie - 5;
  }

  ConstructeurDeBonhomme.prototype.seReposer = function(){
    this.energie = this.energie++;
  }

  // Retourne : la fonction qui créé 1 bonhomme
  return function(x, y, z){
    return new ConstructeurDeBonhomme(x, y, z);
  }
}()); // Fonction Immédiatement Exécutable

usineABonhommes; //contient : la fonction qui créé 1 bonhomme

// Utilisation de la fonction dans usineABonhommes pour créer des bonhommes :
var charlesHenri = usineABonhommes('henri', 'charles', 35);
var charlesMouloud = usineABonhommes('mouloud', 'charles', 34);
var charlesMichel = usineABonhommes('michel', 'charles',55);

/**
* Le DOM : Modele Objet du Document
*/
//window.alert();
//window.prompt();
//window.open();
/*window.setInterval(function(){
  
}, 1000);*/
/* window.setTimeout(function(){
  
}, 1000); */

var toto;
// équivaut à
window.toto;

var maFonction = function(){
  titi; // équivaut à
  window.titi;
}

window.onload = function auChargement() {

  window.document.body.style.backgroundColor = '#CC0000';
  window.document.body.children[1].children[0].style.color = 'pink';

  var objetCorrespondAuSpan = window.document.getElementById('unIdentifiantUnique');

  objetCorrespondAuSpan.style.fontWeight = 'bold';

  window.setInterval(function(){
    if (objetCorrespondAuSpan.style.fontWeight === 'bold') {
      objetCorrespondAuSpan.style.fontWeight = 'normal';
    } else {
      objetCorrespondAuSpan.style.fontWeight = 'bold';
    }
  }, 250)

  window.document.body.onclick = function auClicSurLeCorps() {
    window.console.log('Busted !');
  }
}




































