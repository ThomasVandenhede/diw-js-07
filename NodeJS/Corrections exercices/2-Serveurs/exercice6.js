/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en plus élaboré.

  Votre serveur devra être joignable à l'URL : [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 10.2.1.0
   - Port : 4321
   - Ressource : /ville/paris.html

   Donne l'URL : http://10.2.1.0:4321/ville/paris.html
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.
  
  Votre serveur HTTP doit gérer différents Mime Types. Vous devez faire en sorte que
  le Mime Type soit conforme à l'extension obtenue à partir de la ressource dans l'URL.

  Par exemple :
  - Si l'URL est http://10.2.1.0:4321/photo.jpeg (et que le fichier photo.jpeg existe)
  - Alors l'en-tête de la réponse HTTP doit contenir Content-Type : image/jpeg
  
  Vous devez gérer les Mime Types des formats de fichier suivant : css, js, jpeg, png, pdf, gif.

  La liste des Mime Types autorisés est disponible ici : http://www.iana.org/assignments/media-types/media-types.xhtml
**/

/**
  2. Utiliser votre serveur HTTP pour "servir" votre projet Front End (sur le réseau local).

  Pensez à utiliser l'onglet réseau des outils de développement de votre navigateur Internet pour
  vérifier que vous arrivez bien à télécharger toutes les ressources exigées par votre projet.

  Ajoutez la gestion des Mime Types manquants si nécessaire...
**/

//voir le fichier \home\mimetypes.html
//voir le fichier \home\js\script.js
//voir le fichier \home\css\style.css
//voir le fichier \home\img\virtuoworks.png
//voir le fichier \home\img\virtuoworks.jpeg

var fs = require('fs');
var path = require('path');
var http = require('http');

var httpServer = http.createServer(); 

httpServer.on('request', function (requeteHTTP, reponseHTTP) {

  var ressource = requeteHTTP.url;

  var chemin = path.normalize(process.cwd() + ressource);

  fs.access(chemin, fs.R_OK, function(erreur){

    var code = 200;
 
    if(erreur){
      code = 404;
      chemin = path.normalize(process.cwd() + '/html/404.html');
    };

    fs.readFile(chemin, function(erreur, donnees){

      /**
        on divise la ressource en fonction de la position du séparateur '.'.
        Par exemple : 
        - /index.html donnera ['/index','html'] 
        - /jquery.min.js donnera ['/jquery','min','js']
      **/
      var splittedURL = ressource.split('.');
      var contentType = splittedURL[splittedURL.length - 1]; //on recupère que la dernière valeur qui correspond à l'extension. 

      switch(contentType){
        case 'html':
          contentType = 'text/html; charset=utf-8';
        break;
        case 'js':
          contentType = 'application/javascript';
        break;
        case 'css':
          contentType = 'text/css';
        break;
        case 'png':
          contentType = 'image/png';
        break;
        case 'jpg':
        case 'jpeg':
          contentType = 'image/jpeg';
        break;
        default:
          contentType = 'text/plain';
      };

      if(donnees){
        reponseHTTP.writeHead(code, {
          'Content-Type': contentType,
          'Content-Length': donnees.length
        });

        reponseHTTP.write(donnees, function(){

          reponseHTTP.end(); 

        });
      } else {
        reponseHTTP.end(); 
      }
    });
  });

});

httpServer.listen(4321);