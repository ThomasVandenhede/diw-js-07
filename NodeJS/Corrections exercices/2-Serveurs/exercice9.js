/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en plus élaboré.

  Votre serveur devra être joignable à l'URL : [protocole]://[adresse IP ou nom de domaine][:port][/ressource]?[query string]

  Par exemple :
   - Protocole : http
   - Adresse IP : 192.168.104.15
   - Port : 80
   - Ressource : /formulaire.html
   - Query String : date=2015-09-01

   Donne l'URL : http://192.168.104.15:80/formulaire.html?date=2015-09-01
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel se trouvera un formulaire de saisie.

  Ce formulaire à pour attributs : 
  - method="GET"
  - action="http://[adresse IP ou nom de domaine de votre serveur][:port de votre serveur]/traitement.html"

  Ce formulaire contient 4 champs :
  - titre avec pour attribut name="titre";
  - descriptif avec pour attribut name="descriptif";
  - date avec pour attribut name="date";
  - un bouton de soumission.

  Vérifiez que lorsque vous soumettez votre formulaire, votre navigateur Internet produit bien une requête HTTP dont
  l'URL est de la forme : http://[adresse IP ou nom de domaine de votre serveur][:port de votre serveur]/traitement.html?titre=&descriptif=&date=
**/

/**
  2. 

  Créez un fichier HTML traitement.html dans lequel vous positionnerez trois chaînes de caractères 
  facilement reconnaissable. Par exemple :
  - {{ titre }}
  - {{ description }}
  - {{ date }}

  Après avoir lu et obtenu le contenu du fichier traitement.html et avant de retourner la réponse HTTP,
  votre serveur HTTP doit remplacer dans le contenu du fichier les 3 chaînes de caractères par, respectivement,
  le titre, la description et la date provenant du Query String contenu dans la requête HTTP.
**/

//voir le fichier \home\formulaire.html
//voir le fichier \home\traitement.html

var fs = require('fs');
var url = require('url');
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
          /*if(queryString.prenom){
            donnees = donnees.replace('{{ prenom }}', queryString.prenom);
          } else {
            donnees = donnees.replace('{{ prenom }}', 'Clark');
          }*/
          //on recherche/remplace la chaîne de caractères identifiable ({{ nom }})
          /*if(queryString.nom){
            donnees = donnees.replace('{{ nom }}', queryString.nom);
          } else {
            donnees = donnees.replace('{{ nom }}', 'Kent');
          }*/

          /**
           Même code mais plus économique, on parcourt
           l'objet dans queryString et on remplace dans
           les données chaque texte identifiable à l'aide 
           du nom de la propriété
          **/
          for(propriete in queryString){
            donnees = donnees.replace('{{ ' + propriete +' }}', queryString[propriete]);
          };

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

httpServer.listen(80);