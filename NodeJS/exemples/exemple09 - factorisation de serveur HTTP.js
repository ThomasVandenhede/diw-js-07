
const http = require('http');
const app = require('exemple09-module');

let server = http.createServer();

app(server).listen(80, () => {
	console.log('Listening on 80...');
});

