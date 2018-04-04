
const moduleURL = require('url');
const moduleHTTP = require('http');


var instanceDeServeurHTTP = moduleHTTP.createServer(); // retourne une instance de http.Server

instanceDeServeurHTTP.on('request', function(laRequete, maReponse){
    //laRequete <http.IncomingMessage>
    
	let url = moduleURL.parse(laRequete.url, true);
	
	console.log(url);
	console.log(laRequete.headers);
	
	// MIDDLEWARE...
	
	//maReponse <http.ServerResponse>
	/*
	var donneesDeResponseSousFormeDeBuffer = new Buffer(`Je suis ton PAPA !!!`, 'utf-8');
	maReponse.writeHead(200, {
		'Content-type': 'text/html', // type MIME
		'Content-Length': donneesDeResponseSousFormeDeBuffer.length
	});

	maReponse.write(donneesDeResponseSousFormeDeBuffer, function(){
		maReponse.end();
	});	
	
	// OU (OU EXCLUSIF)
	*/
    var donneesDeResponseSousFormeDeString = `Je suis ton PAPA !!!`;
	// En-tête de réponse
	maReponse.writeHead(200, {
		'Content-type': 'text/html;charset=utf-8', // type MIME
		'Content-Length': Buffer.byteLength(donneesDeResponseSousFormeDeString, 'utf-8')
	});
	
	maReponse.write(donneesDeResponseSousFormeDeString, function(){
		maReponse.end();
	});
});

instanceDeServeurHTTP.listen(1337, function(){
	console.log('Serveur démarré avec pour identifiant 1337.');
});

