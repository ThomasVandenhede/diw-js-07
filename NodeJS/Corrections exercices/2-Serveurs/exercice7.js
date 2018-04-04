/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en plus élaboré.

  Votre serveur devra être joignable à l'URL : [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 212.121.212.45
   - Port : 8080
   - Ressource : /index.html

   Donne l'URL : http://212.121.212.45:8080/index.html
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel vous positionnerez une chaîne de caractères 
  facilement reconnaissable. Par exemple : 
  - ##dateDuJour##

  Après avoir lu et obtenu le contenu d'un fichier et avant de retourner sa réponse HTTP,
  votre serveur HTTP doit remplacer dans le contenu du fichier la chaîne de caractères par
  la date du jour.
**/

/**
  2. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel vous positionnerez deux autres chaînes de caractères 
  facilement reconnaissable. Par exemple :
  - {{ nom }}
  - {{ prenom }}

  Après avoir lu et obtenu le contenu d'un fichier et avant de retourner sa réponse HTTP,
  votre serveur HTTP doit remplacer dans le contenu du fichier les deux chaînes de caractères
  par respectivement votre nom et votre prénom.
**/

//voir le fichier \home\date.html
//voir le fichier \home\civilite.html

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

          var date = new Date();
          //on transforme les données en chaîne de caractères
          var donnees = donnees.toString('utf8');

          //Pour le fichier date.html
          //on recherche/remplace la chaîne de caractères identifiable (##dateDuJour##)
          donnees = donnees.replace('##dateDuJour##', date.toString());

          //Pour le fichier civilite.html
          //on recherche/remplace la chaîne de caractères identifiable ({{ prenom }})
          donnees = donnees.replace('{{ prenom }}', 'Clark');
          //on recherche/remplace la chaîne de caractères identifiable ({{ nom }})
          donnees = donnees.replace('{{ nom }}', 'Kent');
          
          //on remplace les données par les données modifiées retransformée en chaîne d'octets
          donnees = new Buffer(donnees, 'utf8');
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
      };
    });
  });

});

httpServer.listen(8080);