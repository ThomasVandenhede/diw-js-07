const express = require('express');
const app = express();
const path = require('path');
// const MongoClient = require('mongodb').MongoClient;
const db = require('./mes_modules/db/db.js');
console.log(db);

app.locals.pretty = true;

app.use(express.static(path.join(__dirname + '/public')));

app.set('view engine', 'pug');

app.get('/', function(req, res, next) {
  res.render('index');
});

app.get('/ajax-json', function(req, res, next) {
  res.render('ajax-json');
});

app.get('/contenu-json', function(req, res, next) {
  if (req.xhr) {
    const reponseJson = {
      nom: 'Douglas Crockford',
      presentation: 'Douglas Crockford est un programmeur et entrepreneur américain, notamment connu pour sa forte implication dans le développement du langage JavaScript et pour la création du format JSON. Il est également le développeur de l\'outil JSLint, permettant de détecter des erreurs de syntaxe JavaScript ainsi que ce qu\'il considère comme de mauvaises pratiques (les « bad parts »). Il est actuellement architecte logiciel chez Paypal.',
      image: '/images/360px-Douglas_Crockford.jpg'
    }
    res.json(reponseJson);
  } else {
    res.send('Cette adresse doit être appellée en Ajax.');
  }
});

app.get('/contenu-texte', function(req, res, next) {
  res.send('Douglas Crockford est un programmeur et entrepreneur américain, notamment connu pour sa forte implication dans le développement du langage JavaScript et pour la création du format JSON. Il est également le développeur de l\'outil JSLint, permettant de détecter des erreurs de syntaxe JavaScript ainsi que ce qu\'il considère comme de mauvaises pratiques (les « bad parts »). Il est actuellement architecte logiciel chez Paypal.');
})

app.get('/article', function(req, res, next) {

  db.connectDB(req, res, next, function(linkToDb) {
    const collection = linkToDb.collection('articles');
    collection.find().toArray(function(err, documents) {
      res.json(documents);
    });
  });

/*
  MongoClient.connect('mongodb://localhost:27017', function(err, client) {
    if (err) {
      res.status(503);
      next();
      return;
    }
    const baseBlog = client.db('blog');
    const collection = baseBlog.collection('articles');
    collection.find().toArray(function(err, documents) {
      res.json(documents);
    });
  });
*/
})

app.listen(80, function() {
  console.log('Serveur démarré, à l\'écoute sur le port 80');
});