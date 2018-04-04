/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en plus élaboré.

  Votre serveur devra être joignable à l'URL : [protocole]://[adresse IP ou nom de domaine][:port][/ressource]?[query string]

  Par exemple :
   - Protocole : http
   - Adresse IP : 18.17.19.20
   - Port : 6767
   - Ressource : /bonjour.html
   - Query String : nom=Bruce&prenom=Wayne

   Donne l'URL : http://212.121.212.45:6767/bonjour.html?nom=Bruce&prenom=Wayne
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel vous positionnerez deux chaînes de caractères
  facilement reconnaissable. Par exemple :
  - {{ nom }}
  - {{ prenom }}

  Après avoir lu et obtenu le contenu d'un fichier et avant de retourner sa réponse HTTP,
  votre serveur HTTP doit remplacer dans le contenu du fichier les deux chaînes de caractères
  par respectivement le nom et le prénom provenant du Query String.

  Pour extraire des données provenant d'un Query String contenu dans un URL, vous pouvez utiliser
  le module URL de Node JS. Ce module est documenté ici : https://nodejs.org/api/url.html
  Vous vous intéresserez particulièrement à la méthode .parse() qui vous permet d'obtenir les
  différentes partie d'une URL sous la forme d'un objet facilement exploitable en JavaScript.
**/

/**
  2. Votre programme ne doit pas planter si le Query String n'est pas fourni ou que les informations
  demandées n'y figurent pas.
**/

//voir le fichier \home\civilite.html

var fs = require('fs');
var url = require('url'); //on charge le module URL
var path = require('path');
var http = require('http');

var httpServer = http.createServer(); 

httpServer.on('request', function (requeteHTTP, reponseHTTP) {

  //On utilise la méthode .parse() du module URL
  var parsedURL = url.parse(requeteHTTP.url, true); //Le 2ème argument est à true pour "parser également le query string"
  var queryString = parsedURL.query;

  var ressource = parsedURL.pathname;
  
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
          if(queryString.prenom){
            donnees = donnees.replace('{{ prenom }}', queryString.prenom);
          } else {
            donnees = donnees.replace('{{ prenom }}', 'Clark');
          }
          //on recherche/remplace la chaîne de caractères identifiable ({{ nom }})
          if(queryString.nom){
            donnees = donnees.replace('{{ nom }}', queryString.nom);
          } else {
            donnees = donnees.replace('{{ nom }}', 'Kent');
          }
          
          
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

httpServer.listen(6767);