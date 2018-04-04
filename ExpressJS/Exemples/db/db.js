var MongoClient = require('mongodb').MongoClient;
const urlDB = 'mongodb://localhost:27017';
const nameDB = 'blog';

exports.connectDB = function(req,res,next,cb) {
  if (this.mongoClient && this.mongoClient.isConnected(nameDB)) {
    var instance = this.mongoClient.db(nameDB);
    cb(instance);
  } else {
    MongoClient.connect(urlDB, function(err,client) {
      if (err) {
        res.status(503);
        next();
        return;
      }
      this.mongoClient = client;
      var instance = client.db(nameDB);
      cb(instance);
    };
  }
};
