
const moduleHTTP = require('http');

let serveurHTTP = moduleHTTP.createServer();

serveurHTTP.on('request', function(requeteHTTP, reponseHTTP){
	requeteHTTP; //<http.IncomingMessage>
	reponseHTTP; //<http.ServerResponse>
	console.log(requeteHTTP.url);
	
	reponseHTTP.writeHead(200, {
	    'Content-Type': 'text/plain'
	});
	reponseHTTP.write('yo', () => {
		reponseHTTP.end();
	});
});

serveurHTTP.listen(1337, () => {
	console.log('Prêt à recevoir des messages !');
});