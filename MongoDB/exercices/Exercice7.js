// Créer une base de données newyork et une collection restaurants
// Importer le fichier restaurants.json

// use newyork

// Combien y a-t-il de restaurants ?

// Identique à


// Trouver les restaurants qui sont dans la rue "Morris Park Ave"

// Combien y en-a-t-il ?

// Pour aussi récupérer ceux qui ont pour rue "Morris Park Avenue"


// Afficher uniquement (sans l'_id) les champs quartier, type de cuisine et adresse

// Trouver la liste des restaurants situés à Staten Island qui font des hamburgers OU de la boulangerie.
// Avec un $or
// Avec un $in

// Quel est le type de restaurant le plus présent ?

// https://docs.mongodb.com/manual/tutorial/iterate-a-cursor/

// La varibale restaurants est un objet. Dans MongoDB son contenu s'appelle un curseur...
var restaurants = db.restaurants.find()

// Parcours d'un curseur avec un while
while (restaurants.hasNext()) {
  print(tojson(restaurants.next()));
  // équivalent à printjson(restaurants.next())
}

// Parcours d'un curseur avec un foreach
var restaurants = db.restaurants.find()
restaurants.forEach(function(restaurant) {
  printjson(restaurant);
})

// La méthode aggregate de mongoDB fait la même chose de manière plus puissante
// db.collection.aggregate(query, options)

// https://docs.mongodb.com/manual/aggregation/


// Faire la même requête pour le quatier du Bronx

// En limitant le nombre de retours à 5
