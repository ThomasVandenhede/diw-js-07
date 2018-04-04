/**
  Le Serveur HTTP.
  URL : http://[adresse IP/nom de domaine]:8888/

  Ce serveur produit une réponse HTTP contenant un document
  HTML suite à une requête HTTP provenant d'un client HTTP.
**/

// Chargement du module HTTP.
const http = require('http');

// Création du serveur HTTP.
var httpServer = http.createServer();

// Fonction qui produit la réponse HTTP.
var writeResponse = function writeHTTPResponse(HTTPResponse, responseCode, responseBody){
    HTTPResponse.writeHead(responseCode, {
      'Content-type':'text/html; charset=UTF-8',
      'Content-length':responseBody.length
    });
    HTTPResponse.write(responseBody, function(){
      HTTPResponse.end();
    });
};

// Fonction qui produit une réponse HTTP contenant un message d'erreur 404 si le document HTML n'est pas trouvé.
var send404NotFound = function(HTTPResponse){
  writeResponse(HTTPResponse, 404, '<doctype html!><html><head>Page Not Found</head><body><h1>404: Page Not Found</h1><p>The requested URL could not be found</p></body></html>');
};

/**
  Gestion de l'évènement 'request' : correspond à la gestion
  de la requête HTTP initiale permettant d'obtenir le fichier
  HTML contenant le code JavaScript utilisant l'API WebSocket.
**/
httpServer.on('request', function(HTTPRequest, HTTPResponse){
    console.log('Événement \'request\'.');
    var fs = require('fs');
    // Le fichier HTML que nous utiliserons dans tous les cas.
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
  On installe et on utilise le package websocket.
  La documentation est ici : https://www.npmjs.com/package/websocket
**/
var webSocket = require('websocket');

// On récupère une référence à la classe WebSocketServer.
var WebSocketServer = webSocket.server;
/**
  La classe WebSocketServer est documentée ici : 
  https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketServer.md
**/

// On instancie la classe avec pour argument un référence à notre serveur HTTP.
var webSocketServer = new WebSocketServer({
  httpServer: httpServer
});

/**
  Gestion de l'évènement 'request' : correspond à la gestion
  d'une requête WebSocket provenant d'un client WebSocket.
**/
webSocketServer.on('request', function(webSocketRequest){
  
  webSocketRequest; 
  /**
    Objet de type WebSocketRequest documenté ici : 
    https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketRequest.md
  **/

  var acceptedProtocol = 'diwjs';
  var allowedOrigin = webSocketRequest.origin;
   
  /**
    La méthode .accept() prend en argument :
      - le nom du protocole autorisé pour les clients du serveur WebSocket ;
      - l'origine autorisée des requêtes.
    La méthode .accept() retourne un objet de type WebSocketConnection documenté ici : https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md
  **/
  
  var webSocketConnection = webSocketRequest.accept(acceptedProtocol, allowedOrigin);
  /**
    A titre indicatif, coté client, l'utilisation de l'API WebSocket
    devra être utilisée de la façon suivante :
    var webSocketClient = new WebSocket('ws://[adresse IP/nom de domaine]:8888/', 'diwjs');
  **/

  /**
    Gestion de l'évènement 'message' : correspond à la gestion des messages
    reçus par le serveur WebSocket en provenance du client WebSocket.
  **/
  webSocketConnection.on('message', function(message){
    /**
      La variable message est un objet de la forme :
        - Si le message est en UTF-8 : {type: 'utf8', utf8Data: 'le message reçu'}
        - Si le message est en binaire :  {type: 'binary', utf8Data: bufferDeDonneesBinaires}
    **/

    // Affichage du message reçu dans la console.
    console.log(message);

    // Envoi d'un message au client WebSocket.
    webSocketConnection.sendUTF('Message bien reçu !');

  });

});

httpServer.listen(8888);