const path = require('path');

let chemin = path.normalize(__dirname + path.sep +  `exemple13.js`);

console.log(chemin);

let extension = path.extname(chemin);

console.log(extension);

let obj = {
	'.txt': 'text/plain',
	'.html':'text/html;charset=utf-8',
	'.png':'image/png'
}

let ext = '.png';

let mime;
if (obj[ext]) {
	mime = obj[ext];
} else {
	mime = obj['.txt'];
}


// Comment découper cet URL
let url = '/ressource/sousressource?variable=valeur&autrevariable=autrevaleur';

// /ressource/sousressource : ressource
// variable=valeur&autrevariable=valeur : query string

/** Utiliser le module URL **/
let boiteAOutilPourBidouillerLesURL = require('url');

// Parser l'url
let urlBidouillee = boiteAOutilPourBidouillerLesURL.parse(url);

// console.log(urlBidouillee);

urlBidouillee.pathname; // contient /ressource/sousressource

urlBidouillee.query; // contient variable=valeur&autrevariable=autrevaleur

// Utiliser le module querystring
let boiteAOutilPourBidouillerLesQueryString = require('querystring');

// Parser le query string
let queryStringBidouille = boiteAOutilPourBidouillerLesQueryString.parse(urlBidouillee.query);

// console.log(queryStringBidouille);

queryStringBidouille.variable; // contient 'valeur'
queryStringBidouille.autrevariable; // contient 'autrevaleur'

/** OU ALORS utiliser uniquement le module URL **/
urlBidouillee = boiteAOutilPourBidouillerLesURL.parse(url, true);

//console.log(urlBidouillee);

urlBidouillee.query.variable; // contient 'valeur'
urlBidouillee.query.autrevariable; // contient 'autrevaleur'




const fs = require('fs');

var donneesDuFichier

fs.readFile('./choucroute.txt', 'utf-8', function(error, data){
	if (error) {
		console.log('Marche po');
	} else {
	  donneesDuFich1ier = data;
	}
});

setInterval(function(){
	console.log(donneesDuFichier);
});




























