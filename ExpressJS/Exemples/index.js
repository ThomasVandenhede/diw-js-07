var express = require('express');
var app = express();

//BDD
const url = 'mongodb://localhost:27017/blog';

var elements;

//middleware : fonctions de traitement pour toutes ou une partie des routes
  // traitement des données en post
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({extended:false}));

  //session
  var session = require('express-session');
  var cookieParser = require('cookie-parser');
  app.use(cookieParser());
  app.use(session({
    secret:'toto14bidule',
    saveUnitialized: false,
    resave: false
  }));

  //réglages divers
  app.use('/staticFiles',express.static(__dirname + 'folderOfStaticFiles'));
  app.set('view engine','pug');
  app.set('views','pugFiles');

// Routes

app.get('/',function(req,res,next) {
  if (req.session.role == 1 || !req.session.role) {
    res.status(403);
    next();
  }
  elements.session = req.session;
  elementsPage = elements;
  elements = '';
  res.render('maPageAccueil',{elements: elementsPage});
});


app.get('/accueil',function(req,res,next) {
  elements = {titre:'accueil'};
  res.redirect('/');
});


app.use(function(req,res,next) {
  switch (res.statusCode) {
    case 403:
      res.render('403',{titre: 'Accès interdit !', session: req.session });
      break;
    default:
      res.status(404).render('404',{titre: 'Contenu ', session: req.session });
  }
});
