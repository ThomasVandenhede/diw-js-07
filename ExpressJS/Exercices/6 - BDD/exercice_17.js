/*********************************************************
**********UTILISATION D'UNE BASE DE DONNÉES - 2 **********
*********************************************************/

/*********************************
***********Présentation***********
*********************************/
/*
Il est préférable de se connecter à chaque fois qu'une route est gêrée et de se déconnecter à la fin de celle-ci. Cela permet de s'assurer que le serveur est toujours disponible.
Pour cela, il faut prévoir un fichier externe (db.js par exemple) contenant un code tel que celui-ci :

/*
var MongoClient = require('mongodb').MongoClient

var state = {
  db: null,
};

exports.connect = function(url, done) {
  if (state.db) {
    return done();
  }

  MongoClient.connect(url, function(err, db) {
    if (err) {
      return done(err);
    }
    state.db = db;
    done();
  });
};

exports.get = function() {
  return state.db;
};

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      if (err) {
        done(err);
      }
    });
  };
};
*/

/* Dans le fichier index.js où nous gérons les différentes routes, nous faison un require du fichier db.js.
Pour chaque route, nous débutons par le code suivant :
db.connect('ADRESSE DE LA BDD', function(err) {

et nous terminons en coupant la connexion :
db.close();


/*********************************
*************Exercice*************
*********************************/
/*
Reprenez l'exercice précédent. Prévoyez deux routes. Dans chacune, vous vous connectez à la BDD et vous fermez la connection à la fin.
*/
