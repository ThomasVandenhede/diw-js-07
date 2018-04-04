const fs = require('fs');
const http = require('http');
const qs = require('querystring');

let server = http.createServer();

server.on('request', function(request, response){
	if (request.url === '/traitement') {
		let requestBody = '';
		// Reconstitution du corps de la requête
		request.on('data', function(chunk){
			requestBody += chunk;
		});
		// A la fin de la récéption du corps de la requête
		request.on('end', function() {
			// la suite :
			let data = qs.parse(requestBody);

			// on produit une réponse...
			code = 200;
			responseBody = new Buffer(`Bonjour ${data.email} !`);
			response.writeHead(code, {
				'Content-length': responseBody.length,
				'Content-type': 'text/html;charset=utf-8'
			});
			response.write(responseBody, () => {
				response.end();
			});
		});
	} else {
		fs.readFile('./exemple14.html', function(error, data){
			let responseBody;
			if (error) {
				code = 404;
				responseBody = new Buffer('404 Not Found');
			} else {
				code = 200;
				responseBody = data;
			}
			response.writeHead(code, {
				'Content-length': responseBody.length,
				'Content-type': 'text/html;charset=utf-8'
			});
			response.write(responseBody, () => {
				response.end();
			});
		});
	}
});

server.listen(80, () => {
	console.log('Listening on port 80...');
});