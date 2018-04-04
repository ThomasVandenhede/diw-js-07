// ES5-6
const mongoClient = require('mongodb').MongoClient;

// Version asynchrone avec callbacks
/*
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
*/


// Version asynchrone avec object d'exécution asynchrone (Promise)

/*mongoClient.connect('mongodb://toto:password@192.168.107.144/blog') // Promise
.then(function(client){
	console.log('Connecté à MongoDB');
	const db = client.db('blog');
	return db.collection('articles'); // Promise
})
.then(function(collection){
	let leCurseur = collection.find({});
	leCurseur.toArray(function(error, documents){
		if (error) {
			console.log(error.message);
		} else {
			console.log(documents);
		}
	});
})
.catch(function(error) {
	console.log(error.message);
});*/


// Version ES6: Object d'exécution asynchrone géré avec await/async 
var executionAsynchrone = async function() {
	 let client = await mongoClient.connect('mongodb://toto:password@192.168.107.144/blog');

	 
	 if (client) {
		const db = client.db('blog');

		let collection = await db.collection('articles');
		 
		if (collection) {
			let leCurseur = collection.find({});
			leCurseur.toArray(function(error, documents){
				if (error) {
					console.log(error.message);
				} else {
					console.log(documents);
				}
			});
		}
	 }
};

executionAsynchrone().then(function(result){
	console.log(result);
}).catch(function(error){
	console.log(error.message);
});