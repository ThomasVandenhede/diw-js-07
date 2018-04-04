/*********************************************************
**********UTILISATION D'UNE BASE DE DONNÉES - 1 **********
*********************************************************/

/*********************************
***********Présentation***********
*********************************/
/*
Il existe de plusieurs modules pour interfacer NodeJS avec MongoDB. Nous utiliserons le pilote officiel(https://github.com/mongodb/node-mongodb-native).

Pour se connecter à la base de donnée, il faut réaliser deux actions :
- Utilisez le module (écrire en haut de fichier) :
var MongoClient = require('mongodb').MongoClient;

- Condionnez le démarrage du serveur à la connection au serveur Mongo :
MongoClient.connect(URL, function(err, db) {
  if (err) {
    return;
  }
  app.listen …
}
*/


/*********************************
*************Exercice*************
*********************************/
/*

Créez une base de donnée avec une collection en console.
------ 1 ------
Connectez votre fichier JavaScript à votre base de donnée.
------ 2 ------
Prévoyez une variable globale dans laquelle vous pourrez stocker l'argument db de la méthode connect.
------ 3 ------
Quand l'utilisateur accède à la racine du site, utilisez le code suivant pour afficher le contenu de votre base (maDb est la variable globale, cf. point 2).
  var collection = maDb.collection(<nom de la collection>);
  collection.find().toArray(function(err, data){
    //utilisez data qui est un objet contenant les différentes valeurs retournée par find.
  });
});
*/
