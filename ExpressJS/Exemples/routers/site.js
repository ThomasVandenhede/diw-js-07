var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
  res.send('accueil');
});

router.get('/information',function(req,res,next){
  res.send('Quelques informations');
});


module.exports = router;
