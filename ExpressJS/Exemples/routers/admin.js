var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
  res.send('accueil de l\'administration');
});

router.get('/page',function(req,res,next){
  res.send('Une autre page de l\'administration');
});

router.use(function(req,res){
  res.send('erreur');
});

module.exports = router;
