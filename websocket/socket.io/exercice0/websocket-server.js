/**
  Le Serveur HTTP.
  URL : http://[adresse IP/nom de domaine]:8888/

  Ce serveur produit une réponse HTTP contenant un document
  HTML suite à une requête HTTP provenant d'un client HTTP.
**/

//chargement du module HTTP.
const http = require('http');

//création du serveur HTTP.
var httpServer = http.createServer();

//fonction qui produit la réponse HTTP.
var writeResponse = function writeHTTPResponse(HTTPResponse, responseCode, responseBody){
    HTTPResponse.writeHead(responseCode, {
      'Content-type':'text/html; charset=UTF-8',
      'Content-length':responseBody.length
    });
    HTTPResponse.write(responseBody, function(){
      HTTPResponse.end();
    });
};

//fonction qui produit une réponse HTTP contenant un message d'erreur 404 si le document HTML n'est pas trouvé.
var send404NotFound = function(HTTPResponse){
  writeResponse(HTTPResponse, 404, '<doctype html!><html><head>Page Not Found</head><body><h1>404: Page Not Found</h1><p>The requested URL could not be found</p></body></html>');
};

/**
  Gestion de l'évènement 'request' : correspond à la gestion
  de la requête HTTP initiale permettant d'obtenir le fichier
  HTML contenant le code JavaScript utilisant l'API WebSocket.
**/
httpServer.on('request', function(HTTPRequest, HTTPResponse){
    console.log('Événement HTTP \'request\'.');
    var fs = require('fs');
    //le fichier HTML que nous utiliserons dans tous les cas.
    var filename = 'websocket-client.html';
    fs.access(filename, fs.R_OK, function(error){
      if(error){
        send404NotFound(HTTPResponse);
      }else{
        fs.readFile(filename, function(error, fileData){
            if(error){
              send404NotFound(HTTPResponse);
            }else{
              writeResponse(HTTPResponse, 200, fileData);
            }
        });
      }
    });
});

/**
  Le Serveur WebSocket associé au serveur HTTP.
  URL : ws://[adresse IP/nom de domaine]:8888/

  Ce serveur accepte une requête HTTP upgrade et établit
  une connexion persistante basée sur WebSocket.
**/

/**
  On installe et on utilise le package socket.io.
  La documentation est ici : 
  - https://www.npmjs.com/package/socket.io
  - https://github.com/socketio/socket.io
  - http://socket.io/
**/
var socketIO = require('socket.io');

//  On utilise utilise la fonction obtenue avec notre serveur HTTP.
var socketIOWebSocketServer = socketIO(httpServer);

/**
  Gestion de l'évènement 'connection' : correspond à la gestion
  d'une requête WebSocket provenant d'un client WebSocket.
**/
socketIOWebSocketServer.on('connection', function (socket) {

  // socket : Est un objet qui représente la connexion WebSocket établie entre le client WebSocket et le serveur WebSocket. 

  /**
    On attache un gestionnaire d'évènement à un évènement personnalisé 'unEvenement'
    qui correspond à un événement déclaré coté client qui est déclenché lorsqu'un message
    a été reçu en provenance du client WebSocket.
  **/
  socket.on('unEvenement', function (message) {

    // Affichage du message reçu dans la console.
    console.log(message);

    // Envoi d'un message au client WebSocket.
    socket.emit('unAutreEvenement', {texte: 'Message bien reçu !'});
    /**
      On déclare un évènement personnalisé 'unAutreEvenement'
      dont la réception sera gérée coté client.
    **/
    
  });

});

httpServer.listen(8888);