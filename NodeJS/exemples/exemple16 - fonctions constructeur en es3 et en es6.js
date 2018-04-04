// ES3
/*
let FabricantDeMaison = function(){
	this.salon = 'Grand';
	this.aUneSonnette = true;
}

FabricantDeMaison.prototype['je sonne'] = function(){
	console.log('Driiiiing');
}
*/

// ES6
class FabricantDeMaison {
	constructor() {
		this.salon = 'Grand';
		this.aUneSonnette = true;
	}
	
	'je sonne'() {
		console.log('Driiiiing');
	}
}

let maMaison = new FabricantDeMaison();

maMaison['je sonne']();


// ES3
 /*
var SeigneurSith = function(){
    this.estUnJedi = true;
    this.estTresMechant = true;
}

var EnfantSkywalker = function(){
		this.laForceEstAvecLui = true;
		this.estTresMechant = false;
}

EnfantSkywalker.prototype = new SeigneurSith();
*/

// ES6
class SeigneurSith {
	constructor() {
		this.estUnJedi = true;
		this.estTresMechant = true;
	}
}

class EnfantSkywalker extends SeigneurSith {
	constructor() {
		super(); // création d'un Seigneur Sith
		this.laForceEstAvecLui = true;
		this.estTresMechant = false;
	}
}

let luke = new EnfantSkywalker();
let leia = new EnfantSkywalker();

console.log(leia);




























