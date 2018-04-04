'use strict';

// Prototypage en ES3 :
var ConstructeurDeDinosaure = function() {
  this.aDesDents = true;
  this.taille = 'gigantesque';
  this.aggressivite = 'méchant';
};

var megaSaure = new ConstructeurDeDinosaure();

var ConstructeurDePoulet = function() {
  this.aDesDents = false;
  this.taille = 'minus';
};

ConstructeurDePoulet.prototype = megaSaure;

var poulet = new ConstructeurDePoulet();
var autrePoulet = new ConstructeurDePoulet();

// Prototypage en ES6 :
class ConstructeurDeDinosaure {
  constructor() {
    this.aDesDents = true;
    this.taille = 'gigantesque';
    this.aggressivite = 'méchant';
  }

  // ConstructeurDeDinosaure.prototype.cri = function cri() {...};
  cri() {
    alert('Groaaaar !');
  };
}

class ConstructeurDePoulet extends ConstructeurDeDinosaure {
  constructor() {
    // Obligatoire : création une instance de ConstructeurDeDinosaure
    super(); 
    // équivalent à ConstructeurDePoulet.prototype = new ConstructeurDeDinosaure();
    this.taille = 'minus';
    this.aDesDents = false;
  }
}

var poulet = new ConstructeurDePoulet();









































