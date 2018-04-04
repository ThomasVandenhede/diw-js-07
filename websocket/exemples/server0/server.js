const http = require('http');
const fs = require('fs');

const httpServer = http.createServer();

httpServer.on('request', function(req, res) {
  if (req.url === '/') {
    const page = './index.html';
    fs.readFile(page, function(error, fileData) {
      if (error) {
        const body = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Erreur 500</title></head><body><h1>Erreur 500</h1><p>Erreur interne</p></body></html>`;
        res.writeHead(500, {
          'Content-Type': 'text/html',
          'Content-Length': Buffer.byteLength(body)
        })
        res.write(body, () => {
          res.end();
        })
    
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Content-Length': fileData.length
        })
        res.write(fileData, () => {
          res.end();
        })
      }
    })
  } else {
    const body = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Erreur 404</title></head><body><h1>Erreur 404</h1><p>Le document demandé n'existe pas sur ce serveur</p></body></html>`;
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'Content-Length': Buffer.byteLength(body)
    })
    res.write(body, () => {
      res.end();
    })
  }
})


httpServer.on('upgrade', function(WebSocketRequest, socket, head) {
  // 258EAFA5-E914-47DA-95CA-C5AB0DC85B11

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

})


httpServer.listen(8888);
console.log('Serveur démarré sur le port 8888');