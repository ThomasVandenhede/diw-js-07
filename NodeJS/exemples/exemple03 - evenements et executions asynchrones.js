console.log('Exemple 03');

var GestionDesEvenements = require('events');

var modulePourLesFichiers = module.require('fs');

var gestionnaireDEvenements = new GestionDesEvenements();

// on utilise .on() à la place de .addEventListener()
gestionnaireDEvenements.on('ayé', () => {
	console.log('choucroute créée !');
	
});

gestionnaireDEvenements.on('ayé', () => {
	console.log('Et c\'est bon !!!');
	
});

modulePourLesFichiers.writeFile('choucroute.txt', 'Zer gut !', {
    encoding: 'UTF-8'
}, (objetErreur) => {
	console.log('secondaire');
	if (objetErreur) {
		console.log('pas gut !');
	} else {
		gestionnaireDEvenements.emit('ayé');
	}
});

setInterval(() => {
	console.log('Chkrunch !');
}, 1);

