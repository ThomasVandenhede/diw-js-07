const fs = require('fs');
const http = require('http');

let server = http.createServer();

server.on('request', function(request, response){
	let nomAleatoire = 'fichier-de-session-' + Math.round(Math.random() * 100000) + (new Date()).getTime();
	if (request.headers['cookie']) {
		let cookie = request.headers['cookie'].split('=');
		if (cookie[1]) {
			nomAleatoire = cookie[1];
		}
	}
	
	fs.readFile('./sessions/' + nomAleatoire, function(error, data) {
		let sessionData;
		if (error) {
			sessionData = {
				nombreDeVisite: 1,
				created: new Date().getTime(),
			};
			fs.writeFile('./sessions/' + nomAleatoire, JSON.stringify(sessionData), function(error) {
				if (error) {
					console.log('Impossible de créer le fichier de session');
				} else {
					// on répond
					fs.readFile('./exemple15.html', function(error, data){
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
							'Content-type': 'text/html;charset=utf-8',
							'Set-Cookie': 'sessionid=' + nomAleatoire + ';HttpOnly'
						});
						response.write(responseBody, () => {
							response.end();
						});
					});
				}
			});
		} else {
			sessionData = JSON.parse(data.toString('utf-8'));
			sessionData.nombreDeVisite++;
			console.log(sessionData);

			fs.writeFile('./sessions/' + nomAleatoire, JSON.stringify(sessionData), function(error) {
				if (error) {
					console.log('Impossible de modifier le fichier de session');
				}
				// on répond
				fs.readFile('./exemple15.html', function(error, data){
					let responseBody;
					if (error) {
						code = 404;
						responseBody = new Buffer('404 Not Found');
					} else {
						code = 200;
						
						data = new Buffer(data.toString('utf8').replace('{{n}}',  sessionData.nombreDeVisite));
						
						responseBody = data;
					}
					response.writeHead(code, {
						'Content-length': responseBody.length,
						'Content-type': 'text/html;charset=utf-8',
						'Set-Cookie': 'sessionid=' + nomAleatoire + ';HttpOnly'
					});
					response.write(responseBody, () => {
						response.end();
					});
				});
			});
			
		}
	});
});

server.listen(80, () => {
	console.log('Listening on port 80...');
});