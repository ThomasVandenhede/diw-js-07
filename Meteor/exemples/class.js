class Rectangle {
  constructor(hauteur, largeur) {
    this.hauteur = hauteur;
    this.largeur = largeur;
  }
 
  get area() {
    return this.calcArea();
  }

  click(event) {
    
  }

  'click .accept'(event) {

  }

  'calcArea'() {
    return this.largeur * this.hauteur;
  }
}

var RectangleES5 = function(hauteur, largeur) {
  this.hauteur = hauteur;
  this.largeur = largeur;

  this.calcArea = function() {
    return this.largeur * this.hauteur;
  }
}

var carre = new RectangleES5(20, 20);
carre.hauteur;
carre['hauteur'];
console.log(carre.calcArea());



