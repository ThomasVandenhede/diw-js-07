const http = require('http');
const fs = require('fs');
const socketIo = require('socket.io');

const port = 8080;

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


/**
 * On démarre un serveur socket.io avec notre serveur HTTP existant
 */
const socketIoServer = socketIo(httpServer);

/**
 * Retourne un identifiant compatible avec les attributs HTML "id"
 */
const uniqueId = function() {
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randomLetter + Date.now();
};

/**
 * Retourne une couleur aléatoire au format hexadécimal
 */
const getRandomColor = function() {
  return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1,6);
};

const Square = function() {
  const size = 100;
  this.x = size / 2;
  this.y = size / 2;
  this.id = uniqueId();
  this.size = size;
  this.color = getRandomColor();
  this.updatePosition = function(clientX, clientY) {
    this.x = clientX;
    this.y = clientY;
  };
  this.getClientObject = function() {
    return {
      x: this.x,
      y: this.y,
      size: this.size,
      id: this.id,
      color: this.color,
    }
  }
};


/**
 * On crée un tableau pour enregistrer la liste des carrés
 */

const squares = {};
/**
 * Gestion de l'événement 'connection' : correspond à la gestion
 * d'une requête WebSocket provenant d'un client WebSocket.
 */

socketIoServer.on('connection', function(socket) {
  /**
   * socket : un objet qui représente la connexion WebSocket
   * établie entre le client WebSocket et le serveur WebSocket.
   */

  /**
   * Dès la connexion on retourne une liste de tous les carrés existants.
   * On convertit l'objet en tableau pour faciliter le traitement côté client
   * et ne pas exposer les identifiants de socket.
   * Note : Object.keys() ne retourne que les propriétés propres
   * et énumérables d'un objet.
   */
  squaresArray = Object.keys(squares).map(key => squares[key]);
  socket.emit('allSquares', squaresArray);
  /**
   * On attache un gestionnaire d'événement à un événement personnalisé 'createSquare'
   * qui correspond à un événement déclaré coté client qui est déclenché lorsqu'un message
   * a été reçu en provenance du client WebSocket.
   */
  socket.on('createSquare', function() {
    const mySquare = new Square();
    squares[socket.id] = mySquare;
    const clientObject = mySquare.getClientObject();
    console.log(clientObject);

    socket.emit('mySquareCreated', clientObject); // Send square to new player
    socket.broadcast.emit('newSquare', clientObject); // Send square to other players
  });

  socket.on('moveSquare', function(coords) {
    // console.log('[moveSquare] socket.id: ', socket.id, coords);
    if (squares[socket.id]) {
      const mySquare = squares[socket.id];
      mySquare.x = coords.x;
      mySquare.y = coords.y;

      // Broadcast new position to all clients
      const clientObject = mySquare.getClientObject();
      // console.log(clientObject);
      socketIoServer.emit('updateSquarePosition', clientObject);
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('[disconnect]', socket.id, reason);
    if (squares[socket.id] && squares[socket.id].id) {
      const squareId = squares[socket.id].id;
      delete squares[socket.id];
      socketIoServer.emit('removeSquare', squareId);
    }
  });


});

httpServer.listen(port);
console.log('Server listening on port: ' + port);
