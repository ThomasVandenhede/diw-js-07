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
  Gestion de l'évènement 'upgrade' : correspond à une demande
  d'établissement de connexion basée sur WebSocket.
**/
httpServer.on('upgrade', function (WebSocketRequest, socket, head) {

    console.log('Événement \'upgrade\'.');

    /**
      Création de la 'response handshake' : signale au client 
      que le passage au protocole WebSocket est accepté.
    **/
    var secWebsocketKey = WebSocketRequest.headers['sec-websocket-key'];
    var webSocketProtocolGUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

    var crypto = require('crypto');
    var hash = crypto.createHash('sha1');
    hash.update(secWebsocketKey + webSocketProtocolGUID);
    var secWebSocketAccept = hash.digest('base64');

    var webSocketServerHeaders = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      'Sec-WebSocket-Protocol: diwjs',
      'Sec-WebSocket-Accept: ' + secWebSocketAccept
    ].concat('', '').join('\r\n') + '\r\n';

    socket.setTimeout(0);
    socket.setNoDelay(true);
    socket.setKeepAlive(true);

    // Envoi de la 'response handshake' au client.
    socket.write(webSocketServerHeaders, 'ascii');

    /**
     Gestion l'évènement 'data' : Cet évènement survient lorsque le serveur
     WebSocket reçoit des données en provenance du client WebSocket.
    **/
    socket.on('data',function(chunk){
      // chunk : Variable qui contient 1 "data frame" (page de données). 
      
      /**
        Décodage d'une page de données reçue.

        ATTENTION : ceci ne fonctionne pas si la
        donnée est fragmentée en plusieurs pages.
      **/

      // Position par défaut du masque binaire.
      var maskLocation = 2;
      // Position par défaut du masque binaire.
      var maskingKey = chunk.slice(maskLocation, maskLocation + 4);
      // Position par défaut des données.
      var dataLocation = maskLocation + 4;
      // Tableau pour le stockage des données décodées.
      var decodedData = [];
      for (var i = 0; dataLocation < chunk.length; i++) {
        // Décodage octet par octet.
        decodedData.push(chunk[dataLocation] ^ maskingKey[i % 4]);
        dataLocation++
      };
      // Création d'un buffer (suite d'octets) à partir du tableau d'octets décodés.
      var buffer = new Buffer(decodedData);
      // Conversion du buffer en chaîne de caractères.
      var message = buffer.toString();
      // Affichage du message dans la console.
      console.log(message);
    });

});

httpServer.listen(8888);