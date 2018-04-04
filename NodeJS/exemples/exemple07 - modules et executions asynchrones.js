__dirname;

process.on('beforeExit', function(codeDeSortie){
	console.log(`C'est bientôt fini... avec le code ${codeDeSortie}`);
});

try {
	// code suceptible de produire une erreur
} catch(erreur) {
	console.log(erreur);
}

console.log(`Bonjour les amis !`);

//var leMessageDuModule = module.require('exemple7-module');

//console.log(leMessageDuModule);

module.require('exemple7-module').methode();
module.require('exemple7-module').methode();

var fileSystem = require('fs');


fileSystem.readFile('choucroute.txt', {
	encoding: 'utf-8'
}, function(erreur, donnees){
	if (erreur) {
		console.log(`Il y'a eu une erreur.`);
	} else {
		console.log(`Les donnée sont ${donnees}.`);
		// ici on peut continuer sont code en utilisant les données
		// ...
	}
});

cconsole.log('Hahaha !');










