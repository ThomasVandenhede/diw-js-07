const http = require('http');
const fs = require('fs');
const socketIo = require('socket.io');


const port = 3001;

// Création du serveur HTTP.
const httpServer = http.createServer();

const writeResponse = function(httpResponseObject, httpResponseCode, httpResponseBody) {
  switch (httpResponseCode) {
    case 500:
      httpResponseBody = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Erreur 500</title></head><body><h1>Erreur 500</h1><p>Erreur interne.</p></body></html>`;
      break;

    case 404:
      httpResponseBody = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Erreur 404</title></head><body><h1>Erreur 404</h1><p>Le document demandé n'existe pas.</p></body></html>`;
      break;

    case 200:
      break;

   default:
      httpResponseBody = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Erreur non spécifiée</title></head><body><h1>Erreur non spécifiée</h1><p>Une erreur non spécifiée s'est produite.</p></body></html>`;
  } // switch

  httpResponseObject.writeHead(httpResponseCode, {
    'Content-Type': 'text/html; charset=UTF-8',
    'Content-Length': (typeof httpResponseBody === 'string') ? Buffer.byteLength(httpResponseBody) : httpResponseBody.length
  });
  httpResponseObject.write(httpResponseBody, () => {
    httpResponseObject.end();
  });
};


httpServer.on('request', function(req, res) {
  if (req.url === '/') {
    const page = './index.html';
    fs.readFile(page, function(error, fileData) {
      if (error) {
        writeResponse(res, 500);
      } else {
        writeResponse(res, 200, fileData);
      }
    });
  } else {
    /**
     * Nous gérons une seule 'route' (la page d'accueil),
     * toute autre requête renvoie une erreur 404
     */
    writeResponse(res, 404);
  }
});


const socketIoServer = socketIo(httpServer);
console.warn('NON FONCTIONNEL')

socketIoServer.on('connection', function(socket) {
  console.log('connection');

  var listeCarres = [];

  socket.on('nouveauCarre', function(message) {
    console.log('nouveauCarre - avant', listeCarres.length);
    console.log(message);
    listeCarres.push(message);
    console.log('nouveauCarre - après', listeCarres.length);
    socket.broadcast.emit('creerNouveauCarreClient', message);
  });

  socket.on('nouvellePosition', function(message) {
    socket.broadcast.emit('mettreAJourPosition', message);
  });

})




httpServer.listen(port);
console.log('Server listening on port: ' + port);

