var express = require('express');
var app = express();
app.set('view engine','pug');
app.set('views','pugFiles');

var MongoClient = require('mongodb').MongoClient;
const urlDB = 'mongodb://localhost:27017';
const nameDB = 'blog';

app.get('/', function(req,res,next) {
  MongoClient.connect(urlDB, function(err,client) {
    if (err) {
      res.status(503);
      next();
      return;
    }
    var instance = client.db(nameDB);
    var collection = instance.collection('articles');
    //traitements
    collection.find().toArray(function(err,result) {
      console.log(result); // toutes les données d'articles
      client.close();
      res.render('page',{elements:result})
    });
  });
});

app.use(function(req,res,next) {
  switch (res.statusCode) {
    case 503:

      break;
    default:

  }
});

app.listen('8080', function() {
  console.log('écoute sur le port 8080');
});
