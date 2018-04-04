// Vélib


// Récupérer un fichier json des velib chez jcdecaux developer
// https://developer.jcdecaux.com/#/opendata/vls?page=static

// Importer dans la base paris, le fichier jcdecaux.json dans une collection velib
mongoimport --db paris --collection velib --file velib.json --jsonArray

// Le fichier récupéré est un tableau d'objets, il faut donc spécifier à l'éxecutable mongoimport l'option --jsonArray pour qu'il se comporte en conséquence

var machaine = "RUE DES CHAMPEAUX (PRES DE LA GARE ROUTIERE) - 93170 BAGNOLET";
var regex = /\d{5}/;
var cp = machaine.match(regex);
print(cp)

// Problème ! On n'a pas de champ codepostal ... On retrouve le code postal dans l'adresse.

// Mettez à jour tous les enregistrements en leur ajoutant un champ zipCode
var allStations = db.velib.find();

allStations.forEach(function(singleStation){
  var zipCode = parseInt(singleStation.address.match(/\d{5}/)[0]);
  print(zipCode);
  db.velib.update(
    {_id:singleStation._id},
    {$set: {zipCode: zipCode}}
  )
})
// Quel est l'arrondissement de Paris ou il y a le plus de stations ? (avec un $in)
db.velib.aggregate(
  { $match : {zipCode: {$in : [75001,75002,75003,75004,75005,75006,75007,75008,75009,75010,75011,75012,75013,75014,75015,75016,75017,75018,75019,75020]}}},
  { $group : { _id: "$zipCode", nbstations : { $sum: 1 }}},
  { $sort : { nbstations : -1 }}
)

// OU plus élégant
db.velib.aggregate(
  { $match : {zipCode: {$lt: 75021}}},
  { $group : { _id: "$zipCode", nbstations : { $sum: 1 }}},
  { $sort : { nbstations : -1 }}
)

// Quelle est la ville (hors Paris) qui a le plus de stations
db.velib.aggregate(
  { $match : {zipCode: {$gt: 75021}}},
  { $group : { _id: "$zipCode", nbstations : { $sum: 1 }}},
  { $sort : { nbstations : -1 }}
)

// OU plus élégant

// Cherchez la piscine Dunois .


// Quelles sont les 5 stations velib les plus proches de la piscine Dunois ?
// Première version : en utilisant une fonction de calcul de distance
// Passed to function:
// lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)
// lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)
// unit = the unit you desire for results
//  where: 'M' is statute miles (default)
//         'K' is kilometers
//         'N' is nautical miles
function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1 / 180
	var radlat2 = Math.PI * lat2 / 180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta / 180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}
// Distance par rapport à la piscine
var dunois = db.piscines.findOne({name: /Dunois/});
var allStations = db.velib.find();

allStations.forEach(function(singleStation){
  db.velib.update(
    {_id : singleStation._id},
    {$set : { distance : distance(dunois.lat, dunois.lon, singleStation.latitude, singleStation.longitude, 'K')}}
    )
})

db.velib.find({},{name:1, zipCode:1,distance:1,_id:0}).sort({distance : 1}).limit(5)
// Seconde version : en modifiant la structure de la collection et en utilisant l'opérateur géographique $near
var allStations = db.velib.find();

allStations.forEach(function(singleStation){
  db.velib.update(
    {_id : singleStation._id},
    { $set : { emplacement : { type: "Point", coordinates: [ singleStation.latitude, singleStation.longitude ] }}}
  )
})

// Pour fonctionner l'opérateur $near requiert un index de type 2dsphere
db.velib.createIndex( { emplacement: "2dsphere" })

// On va faire un find() avec l'opérateur $near
var dunois = db.piscines.findOne({name: /Dunois/});
db.velib.find(
   { // Requete
     emplacement:
       { $near :
          {
            $geometry: { type: "Point",  coordinates: [ dunois.lat, dunois.lon ] },
            $minDistance: 0,
            $maxDistance: 5000
          }
       }
   },
   { name:1, zipCode:1,distance:1,_id:0 } // Projection
).limit(5)













