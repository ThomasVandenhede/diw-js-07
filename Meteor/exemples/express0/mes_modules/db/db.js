var MongoClient = require('mongodb').MongoClient;
const urlDB = 'mongodb://localhost:27017';
let mongoClient;
let instance;
console.log('init');
exports.connectDB = function(req, res, next, dbName, cb) {
  console.log('connectDB');
  if (mongoClient) {
    console.log('reusing instance');
    if (mongoClient.isConnected(dbName)) {
      cb(instance);
    } else {
      console.log('Connected to db: ', dbName);
      instance = mongoClient.db(dbName);
      cb(instance);
    }
  } else {
    console.log('No connection');
    MongoClient.connect(urlDB, function(err, client) {
      console.log('A');
      if (err) {
        console.log('MongoClient.connect error');
        res.status(503);
        next();
        return;
      }
      mongoClient = client;
      instance = mongoClient.db(dbName);
      console.log('New instance');
      cb(instance);
    });
  }
};
