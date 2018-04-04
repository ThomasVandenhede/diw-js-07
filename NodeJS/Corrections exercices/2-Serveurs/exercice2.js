/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en plus élaboré.

  Votre serveur devra être joignable à l'URL : [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 10.30.20.30
   - Port : 8899
   - Ressource : /index

   Donne l'URL : http://10.30.20.30:8899/index
**/

/**
  Exercices :
    
  1. Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP un corps de réponse
    en format HTML valide si et seulement si l'URL contenue dans la requête HTTP contient 
    /index.

    Votre objet de type http.IncomingMessage contient une propriété .url vous permettant
    d'obtenir des informations relatives à l'URL employé pour effectuer la requête HTTP.
**/

/**
  2. Améliorez votre serveur HTTP pour que, si l'URL employé pour effectuer la requête HTTP
  ne contient pas /index, votre serveur HTTP produise une réponse HTTP avec dans :
   - l'en-tête, un code 404;
   - le corps, un message en format HTML valide du type : L'URL demandé n'existe pas.
**/

var http = require('http');

var httpServer = http.createServer(); 

httpServer.on('request', function (requeteHTTP, reponseHTTP) {

  var ressource = requeteHTTP.url;

  //Pour que le navigateur Internet sache quel est l'encodage du texte,
  if (ressource == '/index') {
    var code = 200;
    //je place un meta avec le charset dans le code HTML...
    var corpsDeLaReponseHTTP = '<!DOCTYPE html><html><head><title>code HTML valide</title><meta charset="UTF-8"></head><body><p>Ceci est un code HTML valide.</p></body></html>';
  } else {
    var code = 404;
    //je place un meta avec le charset dans le code HTML..;
    var corpsDeLaReponseHTTP = '<!DOCTYPE html><html><head><title>Erreur 404</title><meta charset="UTF-8"></head><body><h1>Erreur 404</h1><p>L\'URL demandé n\'existe pas.</p></body></html>';
  }

  reponseHTTP.writeHead(code, {
    'Content-Type': 'text/html; charset=utf-8', //...et/ou j'ajoute charset=utf-8 dans l'en-tête de la réponse HTTP à coté du Mime Type
    'Content-Length': Buffer.byteLength(corpsDeLaReponseHTTP, 'utf8')
  });

  reponseHTTP.write(corpsDeLaReponseHTTP, function(){

    reponseHTTP.end(); 

  });
});

httpServer.listen(8899);