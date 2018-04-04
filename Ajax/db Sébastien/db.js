var MongoClient = require('mongodb').MongoClient;
const urlDB = 'mongodb://localhost:27017';
const nameDB = 'newyork';
let mongoClient = null;
let instance = null;

exports.connectDB = function(req,res,next,cb) {
  console.log(instance);
  if (mongoClient && mongoClient.isConnected(nameDB)) {
    console.log('reusing instance');
    cb(instance);
  } else {
    MongoClient.connect(urlDB, function(err,client) {
      if (err) {
        res.status(503);
        next();
        return;
      }
      mongoClient = client;
      instance = mongoClient.db(nameDB);
      console.log('New instance');
      cb(instance);
    });
  }
};
