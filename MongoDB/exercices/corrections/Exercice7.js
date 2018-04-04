// Créer une base de données newyork et une collection restaurants
// Importer le fichier restaurants.json

// use newyork

// Combien y a-t-il de restaurants ?
db.restaurants.find().count()
// Identique à
db.restaurants.count()
// Identique à
db.restaurants.find({}).count()

// Trouver les restaurants qui sont dans la rue "Morris Park Ave"
db.restaurants.find({
  "address.street" : "Morris Park Ave"
})

// Combien y en-a-t-il ?
db.restaurants.find({
    "address.street" : "Morris Park Ave"
}).count()

// Pour aussi récupérer ceux qui ont pour rue "Morris Park Avenue"
db.restaurants.find({
  "address.street" : /Morris Park Ave/
})

db.restaurants.find({
  "address.street": RegExp('Morris Park Ave')
})

// Afficher uniquement (sans l'_id) les champs : quartier, type de cuisine et adresse
db.restaurants.find({}, {
  _id: 0,
  borough: 1,
  cuisine: 1,
  address: 1
})


// Trouver la liste des restaurants situés à Staten Island qui font des hamburgers OU de la boulangerie.
// Avec un $or

db.restaurants.find({
  borough: RegExp('Staten Island'),
  $or: [
    { cuisine: { $eq: 'Hamburgers' } },
    { cuisine: { $eq: 'Bakery' } }
  ]
})

db.restaurants.find({
  $and: [
    {
      borough: {
        $eq: "Staten Island"
      }
    },
    {
      $or: [
        { cuisine: { $eq: "Bakery" } },
        { cuisine: "Hamburgers" }
      ]
    }
  ]
})
.count()

// Avec un $in
db.restaurants.find({
  $and: [{
    borough: {
      $eq: "Staten Island"
    }
  }, {
    cuisine: {
      $in: [ "Bakery", "Hamburgers" ]
    }
  }]
}).count()


// La varibale restaurants est un objet. Dans MongoDB, ils appellent cela un curseur...
var restaurants = db.restaurants.find()

// Parcours d'un curseur avec un while
while (restaurants.hasNext()) {
  print(tojson(restaurants.next()));
  // équivalent à printjson(restaurants.next())
}

// Parcours d'un curseur avec un foreach
var restaurants = db.restaurants.find()
restaurants.forEach(function(restaurant){
  printjson(restaurant);
})

// Quel est le type de restaurant le plus présent ?
// Soit on se le fait à la main


var restos = db.restaurants.find(); // myCursor  restos
var cuisines = {};
restos.forEach(function(resto) {
  if (cuisines[resto.cuisine] === undefined) {
    cuisines[resto.cuisine] = 0;
  }
  cuisines[resto.cuisine]++;
});
var sortedCuisines = [];
for (var cuisine in cuisines) {
  sortedCuisines.push([cuisine, cuisines[cuisine]]);
}
sortedCuisines.sort(function(a, b) {
  return a[1] - b[1];
});
var winner = sortedCuisines[sortedCuisines.length-1];
print('Winner: ' + winner[0] + ' avec ' + winner[1] + ' restaurants')


/*
var highScore = 0;
var final = '';
printjson(cuisines)
for (propCount in cuisines) {
  if (cuisines[propCount] > highScore) {
    highScore = cuisines[propCount];
    final = propCount + ' : ' + highScore;
  }
}
// print(final);
*/


// La méthode aggregate de mongoDB fait la même chose de manière plus puissante
// db.collection.aggregate(query, options)

// https://docs.mongodb.com/manual/aggregation/

db.restaurants.aggregate([
  {
    $match: {
    }   // Sélection de tous les restaurants
  }, {
    $group: {
      _id: "$cuisine",
      total: {
        $sum: 1
      }
    }  // crée une collection temporaire avec comme champ _id le champ cuisine et définit un champ total incrémenté de 1  à chaque occurrence de cuisine
  }, {
    $sort: {
      total: -1
    }  // On trie par total décroissant
  }
]);


// Faire la même requête pour le quatier du Bronx
db.restaurants.aggregate([{
  $match: {
    borough: "Bronx"
  } // Ignorer match, sélectionner TOUS les restaurants
}, {
  $group: {
    _id: "$cuisine",
    total: {
      $sum: 1
    }
  }
}, {
  $sort: {
    total: -1
  }
}
]);


// En limitant le nombre de retours à 5
db.restaurants.aggregate([{
  $match: {
    borough: {$eq: "Bronx"}
  }
}, {
  $group: {
    _id: "$cuisine", total: {
      $sum: 1
    }
  }
}, {
  $sort: {
    total: -1
  }
}, {
  $limit: 5
}
]);
