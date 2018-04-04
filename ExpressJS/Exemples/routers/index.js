var express = require('express');
var app = express();

var site = require('./site');
var admin = require('./admin');

app.use('/',site);
app.use('/admin',admin);

app.use(function(req,res){
  res.send('erreur');
});

app.listen(8080,function(){
  console.log('Port 8080');
});
