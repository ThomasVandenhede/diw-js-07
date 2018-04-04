// Mise à jour -> update

// Dans la liste des restaurants
use newyork
// Modifier les restaurants dont la cuisine est Hamburgers pour leur ajouter un champ healthy_food égal à 2
db.restaurants.update(
  { cuisine : "Hamburgers"},
  { $set : { healthy_food : 2}},
  { multi: true}
)

db.restaurants.updateMany(
  { cuisine : "Hamburgers"},
  { $set : { healthy_food : 2}}
)
// Pour les végétariens, leur mettre le champ healthy food à 9.
db.restaurants.update(
  { cuisine : "Vegetarian"},
  { $set : { healthy_food : 9}},
  { multi: true}
)
// Vérifier ques tous les restaurants ont un tableau grades
db.restaurants.count()
db.restaurants.count({grades:{ $exists: true}})

// Supprimer le champ building des restaurants situés dans le Bronx et ajouter un booléen
db.restaurants.update(
  { borough : "Bronx" },
  { $unset : { "address.building":1 }, $set : { mybool : true } },
  { multi : true}
)

// Vérifier
db.restaurants.findOne({ borough : "Bronx" })

// Ajouter un champ rating à 5 à tous les restaurants
db.restaurants.update(
  { },
  { $set : { rating : 5 } },
  { multi : true}
)
// Multiplier le champ rating par 2 pour les restaurants situés dans le Queens
db.restaurants.update(
  { borough: "Queens"},
  { $mul : { rating : 2 } },
  { multi : true}
)
// Trouver les restaurants de Brooklyn
db.restaurants.find({ borough: "Brooklyn"})

// Limiter les résultats à 100
db.restaurants.find({ borough: "Brooklyn"}).limit(100)

// Appliquer d'abord un count()
db.restaurants.find({ borough: "Brooklyn"}).limit(100).count()

// Puis à la place appliquer un size()
db.restaurants.find({ borough: "Brooklyn"}).limit(100).size()

// Quelle est la différence ?
db.restaurants.find({ borough: "Brooklyn"}).count()
db.restaurants.find({ borough: "Brooklyn"}).size()

// Ajouter une entrée au tableau grades pour le restaurant "Tu-Lu'S Gluten-Free Bakery"
db.restaurants.findOne( { name : "Tu-Lu'S Gluten-Free Bakery" } )
db.restaurants.update(
  { name : "Tu-Lu'S Gluten-Free Bakery" },
  { $push : { grades : { date: new Date(), grade : "B", rating: 11}}},
  {}
)


// Modifier le champ rating pour tous les documents pour qu'il soit égal à la moyenne réelle des grades
// Créer un curseur et le manipuler avec un forEach

var allRestaurants = db.restaurants.find()
allRestaurants.forEach(function(singleRestaurant){
  var averageScore = 0;
  for ( var i = 0; i < singleRestaurant.grades.length ; i++) {
    //print(singleRestaurant.grades[i].score);
    averageScore += singleRestaurant.grades[i].score;
    // Calcul de la moyenne
  }
  averageScore = averageScore / singleRestaurant.grades.length;
  //print(averageScore);

  singleRestaurant.rating = averageScore;

  // Mise à jour du restaurant
  // db.restaurants.update(
    // {_id : singleRestaurant._id },
    // { $set : { rating : averageScore } }
  // )

  // méthode alternative pour enregistrer le document
  db.restaurants.save(singleRestaurant)

})

// Quel est le restaurant qui a la meilleure moyenne

db.restaurants.find({}, {name: 1, rating:1, _id:0}).sort({rating:-1}).limit(1)








