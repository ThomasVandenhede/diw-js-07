// Dans la collection piscines de la base paris, trouver :

// les piscines dont le code postal est supérieur ou égal à 75013 triées par code postal descendant
db.piscines.find(
  {
    zipCode:
    {
      $gte: 75013,
    }
  }, {
    name: true,
    zipCode: true,
    _id: false
  }
).sort({zipCode: -1}).pretty();

// Les piscines situées à l'ouest de Notre Dame de Paris
// Notre Dame de Paris : longitude : 2.349722 latitude : 	48.853056
// Celles à l'Ouest sont celles dont la longitude est inférieure à 2.349722
db.piscines.find({
  lon: { $lt: 2.349722 }
}).pretty()


// Et leur nombre
db.piscines.find( { lon: { $lt: 2.349722 } }, { name: 1 } ).count()


// Les piscines dont zipCode=75013 ET id=2929 avec l'opérateur $and et $eq
db.piscines.find({
  $and: [
    { zipCode: { $eq: 75013 } },
    { id: { $eq: 2929 } },
  ]
}).pretty()

// On peut simplifier - uniquement l'opérateur $and
db.piscines.find({
  $and: [
    { zipCode: 75013 },
    { id: 2929 },
  ]
}).pretty()

// Version la plus courte
db.piscines.find( { zipCode: 75013, id: 2929 } ).pretty()
