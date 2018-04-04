/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en plus élaboré.

  Votre serveur devra être joignable à l'URL : [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 168.192.10.168
   - Port : 5678
   - Ressource : /index.html

   Donne l'URL : http://168.192.10.168:5678/index.html
**/

/**
  Exercices :

  1. Créez un serveur HTTP qui retourne dans sa réponse HTTP le contenu du fichier 
  dont le nom est le même que celui obtenu à partir de l'URL si ce fichier existe.

  Et, si le fichier n'existe pas le serveur HTTP retournera dans sa réponse HTTP le
  contenu du fichier 404.html que vous avez créé pour l'exercice précédent.

  Vous devrez donc reconstruire le chemin qui vous permettra d'ouvrir un fichier à
  partir de la ressource fournie dans l'URL.
  
  Par exemple, si l'URL est :
  - http://168.192.10.168:5678/html/contact.html (la ressource est donc /html/contact.html)
  Le serveur HTTP devra ouvrir et obtenir le contenu du fichier dont le chemin système est :
  - c:\diwjs\nodejs\app\html\contact.html (ou c:\diwjs\nodejs\app\ est mon dossier de travail)

  Pour obtenir le chemin vers le dossier dans lequel votre serveur s'exécute, vous pouvez 
  utiliser l'objet Process vu précédemment. Et pour faire en sorte que les slash soient 
  corrects, vous pouvez utiliser le module path de Node JS et particulièrement sa méthode
  .normalize() . Documenté ici : https://nodejs.org/api/path.html#path_path_normalize_p
**/

//voir le fichier \home\home.html
//voir le fichier \home\about.html
//voir le fichier \home\contact.html
//voir le fichier \home\404.html

var fs = require('fs');
var path = require('path'); //On charge le module path.
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

      if(donnees){
        reponseHTTP.writeHead(code, {
          'Content-Type': 'text/html; charset=utf-8',
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

httpServer.listen(5678);