let somme = function (nombre1, nombre2) {
	nombre1 = nombre1 || 0;
	nombre2 = nombre2 || 0;
 	return parseFloat(nombre1) + parseFloat(nombre2); 
}

let soustraction = function (nombre1, nombre2) {
	nombre1 = nombre1 || 0;
	nombre2 = nombre2 || 0;
 	return parseFloat(nombre1) - parseFloat(nombre2); 
}

module.exports.somme = somme;