const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
// const MongoClient = require('mongodb').MongoClient;
const db = require('./mes_modules/db/db.js');

app.locals.pretty = true;

var maSession;

app.use(session({
  secret:'123456789SECRET',
  saveUninitialized: true,
  resave: false
}));

app.use(express.static(path.join(__dirname + '/public')));

app.set('view engine', 'pug');

app.get('/', function(req, res, next) {


  maSession = req.session;
  if (maSession.compteur !== undefined) {
    maSession.compteur++;
  } else {
    maSession.compteur = 0;
  }

  console.log('maSession.compteur: ', maSession.compteur);
  res.render('index',  {nombreDeVisites: maSession.compteur});
});


app.listen(80, function() {
  console.log('Serveur démarré, à l\'écoute sur le port 80');
});