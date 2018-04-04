const fs = require('fs');
const http = require('http');
const mongoClient = require('mongodb').MongoClient;

let server = http.createServer();


let httpResponse = function (response, code, responseBody) {
	response.writeHead(code, {
		'Content-length': responseBody.length,
		'Content-type': 'text/html;charset=utf-8'
	});
	response.write(responseBody, function(){
		response.end();
	});
}

server.on('request', function(request, response) {
	fs.readFile('./exemple18.html', function(error, data){
		let code;
		let responseBody;
		if (error) {
			code = 404;
			responseBody = new Buffer('Page not found !');
			httpResponse(response, code, responseBody);
		} else {
			mongoClient.connect('mongodb://toto:password@192.168.107.144/blog', {
				socketTimeoutMS: 3000,
				connectTimeoutMS : 3000
			},function(error, client){
				if (error) {
					code = 500;
					console.log(error.message);
					responseBody = new Buffer('Database not found !');
					httpResponse(response, code, responseBody);
				} else {
					console.log('Connecté à MongoDB');
					client; //
					const db = client.db('blog');
					db.collection('articles', function(error, collection){
						if (error) {
							code = 500;
							console.log(error.message);
							responseBody = new Buffer('Collection not found !');
							httpResponse(response, code, responseBody);
						} else {
							let leCurseur = collection.find({});
							leCurseur.toArray(function(error, documents){
								if (error) {
									code = 500;
									console.log(error.message);
									responseBody = new Buffer('Documents not found !');
									httpResponse(response, code, responseBody);
								} else {
									code = 200;
									console.log(documents);
									let replacement = '';
									documents.forEach(function(document){
										replacement += `<h2>${document.titre}</h2><p>${document.corps}</p>`;
									});
									let responseBody = new Buffer(data.toString('utf-8').replace('{{lesArticles}}', replacement));
									httpResponse(response, code, responseBody);
								}
							});
						}
					})
				}
			});
		}
		
	})
	
});

server.listen(80, function(){
	console.log('Listening on port 80...');
})
