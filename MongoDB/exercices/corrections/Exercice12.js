// Suppression de documents

// db.collection.remove(query, options)


// Importer le fichier seas.json dans la db world collection seas
mongoimport --db world --collection seas --file seas.json
// Suppression de tous les enregistrements
use world
db.seas.remove({})

// Réimporter !! ;-)

// Supprimer l'océan Atlantique
db.seas.remove({ secureName: "sea-Atlantic"})
// Supprimer les mers bordant l'océan atlantique
db.seas.remove({ bordering: /tlantic/})
// Quelle est la mer la plus profonde ?
db.seas.find({},{name:1, depth:1, _id:0}).sort({depth:-1})
// Ajouter la mer 'Océan Atlantique'
db.seas.insert({"secureName": "sea-Atlantic",
"country": "F E GBZ IS IRL GB P AG BS BDS CDN USA C WD DOM RH WG KN WL WV TT RA BR RCH ROU FGU GUY SME YV RIM MA WSA ANG RCB NAM ZRE BEN WAN RT RSA CI GH CAM GQ G CV RG LB WAG SN GNB WAL NLSM SMAR SBAR STP PR AXA GUAD MART BVIR MNTS VIRG HELX FALK SPMI BERM TUCA SVAX GROX FARX",
"bordering": "sea-Mittelmeer sea-Channel sea-Irische_See sea-Nordsee sea-NorwegianSea sea-Greenlandsea sea-LabradorSea sea-Golf_von_Mexiko sea-Caribbean sea-Indic",
"name": "Atlantic Ocean",
"depth": 9219
})
// Ajouter un tableau à toutes les mers
db.seas.update(
  {},                         // query
  {$set :{ tableau : []}},    // update
  {multi:true}                //options
)
// Quelle est la profondeur cumulée de toutes les mers ?
db.seas.aggregate(
  { $match: {}},                         // query
  { $group : { _id: null , profondeur:{$sum: "$depth"}}}
)
