setTimeout(function(){
	// Au bout de 1 sec
	setTimeout(function(){
		// Au bout de 2 sec
	}, 1000);
}, 1000);

const moduleFileSystem = require('fs');


let faitDesTrucsAvecData = function(lesDatas) {
	console.log(lesDatas);
}

moduleFileSystem.readFile('./exemple10.js', (error, data) => {
	if (error) {
		console.log('Impossible de lire le fichier');
	} else {
		faitDesTrucsAvecData(data);
	};
});
