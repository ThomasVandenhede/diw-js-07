/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en plus élaboré.

  Votre serveur devra être joignable à l'URL : [protocole]://[adresse IP ou nom de domaine][:port]

  Par exemple :
   - Protocole : http
   - Adresse IP : 1.2.3.4
   - Port : 7777

   Donne l'URL : http://1.2.3.4:7777
**/

/**
  Exercices :
    
  1. Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP un corps de réponse
    en format HTML obtenu à partir du contenu d'un fichier.

    Vous devez donc créer un fichier HTML valide à coté de votre programme.

    A chaque requête HTTP reçue, vous utiliserez les méthodes asynchrones de l'objet 
    FileSystem de Node JS pour lire et obtenir le contenu de votre fichier HTML. Puis,
    vous produirez une réponse HTTP contenant le contenu du fichier HTML.
**/
var fs = require('fs'); //On charge le module FileSystem.
var http = require('http');

var httpServer = http.createServer(); 

httpServer.on('request', function (requeteHTTP, reponseHTTP) {

  var chemin = 'html\\home.html';

  fs.readFile(chemin, function(erreur, donnees){

    /**
      Attention ici je ne précise pas d'encodage lorsque j'utilise .readFile()
      donc donnees contient des octets et n'est pas une chaîne de caractères.
      C'est pourquoi pour l'en-tête Content-Length j'utilise directement la
      propriété .length pour mesurer la taille de la séquence d'octets.
    **/
    if(donnees){
      reponseHTTP.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': donnees.length
      });

      reponseHTTP.write(donnees, function(){

        reponseHTTP.end(); 

      });
    }
  });

});

httpServer.listen(7777);