// ES5-6
const mongoClient = require('mongodb').MongoClient;
// ES6
//import { MongoClient } from 'mongodb';
mongoClient.connect('mongodb://toto:password@192.168.107.144/blog', function(error, client){
	if (error) {
		console.log(error.message);
	} else {
		console.log('Connecté à MongoDB');
		client; //
		const db = client.db('blog');
		db.collection('articles', function(error, collection){
			if (error) {
				console.log(error.message);
			} else {
				let leCurseur = collection.find({});
				leCurseur.toArray(function(error, documents){
					if (error) {
						console.log(error.message);
					} else {
						console.log(documents);
					}
				});
			}
		})
	}
});



























