const fs = require('fs');
const http = require('http');

let server = http.createServer();

server.on('request', function (request, response) {
	fs.readFile('./page.topmoumoute', (error, data) => {
		if (error) {
			codeHTTP = 404;
			data = new Buffer('<h1>Erreur 404</h1>');
		} else {
			codeHTTP = 200;
			let texte = data.toString('utf-8');
			texte = texte.replace('#[(laDate)]#', (new Date()).toString());
			data = new Buffer(texte);
		};
		// D'abord on écrit l'en-tête  de la réponse
		response.writeHead(codeHTTP, {
			'Content-Type': 'text/html;charset=utf-8',
			'Content-Length': data.length
		});
		// D'abord on écrit le contenu de la réponse
		response.write(data, () => {
			response.end();
		});
	});

});

server.listen(8080, function () {
	console.log('Listening on port 8080...');
});