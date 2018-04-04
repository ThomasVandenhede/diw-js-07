/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en plus élaboré.

  Votre serveur devra être joignable à l'URL : [protocole]://[adresse IP ou nom de domaine][:port]

  Par exemple :
   - Protocole : http
   - Adresse IP : 100.50.25.12
   - Port : 6666

   Donne l'URL : http://100.50.25.12:6666
**/

/**
  Exercices :
  
  1. Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP un corps de réponse en format HTML valide.
  Attention, vous devez pensez à retourner dans l'en-tête de votre réponse HTTP le Mime Type correct (pour le HTML,
  il s'agit du Mime Type text/html)
**/

var http = require('http');

var httpServer = http.createServer(); 

httpServer.on('request', function (requeteHTTP, reponseHTTP) {

  //Le corps de la réponse est un code HTML valide
  var corpsDeLaReponseHTTP = '<!DOCTYPE html><html><head><title>code HTML valide</title></head><body><p>Ceci est un code HTML valide.</p></body></html>';

  reponseHTTP.writeHead(200, {
    'Content-Type': 'text/html', //Ici le Mime Type est text/html
    'Content-Length': Buffer.byteLength(corpsDeLaReponseHTTP, 'utf8')
  });

  reponseHTTP.write(corpsDeLaReponseHTTP, function(){

    reponseHTTP.end(); 

  });
});

httpServer.listen(6666);