var express = require('express');
var app = express();
app.set('view engine','pug');
app.set('views','pugFiles');

var dbInterface = require('./db');

app.get('/', function(req,res,next) {
  db.connectDB(req,res,next, function(linkToDb) {
    var collection = linkToDb.collection('articles');
    //traitements
    collection.find().toArray(function(err,result) {
      console.log(result); // toutes les données d'articles
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
