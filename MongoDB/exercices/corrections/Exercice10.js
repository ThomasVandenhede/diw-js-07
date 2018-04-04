// Aggrégation

// Importer dans une base le fichier website.json
mongoimport --db web --collection sites --file website.json
// Quel est l'hébergeur qui héberge le plus de sites ?
use websites
db.site.aggregate(
  { $match : {} },
  { $group : { _id : "$hebergeur", nbSites : { $sum : 1}}},
  { $sort : { nbSites : -1 }}
)
// Pour l'hébergeur gandi, quel site a le plus de traffic
db.site.find({hebergeur : "Gandi"}).sort({traffic : -1}).limit(1)

// Quel est le traffic cumulé des hébergeurs ? Qui est le premier ?

// Problème : le traffic est une chaine de caractères et non un entier. Il faut préalablement convertir le traffic en entier
db.site.find().forEach(function(singleSite){
  db.site.update(
    {_id : singleSite._id},
    { $set: {traffic : parseInt(singleSite.traffic)}}
  )
})


// Ou version plus longue et plus lisible
var cursor = db.site.find();

cursor.forEach(function(singleSite){
  db.site.update(
    {_id : singleSite._id},
    { $set: {traffic : parseInt(singleSite.traffic)}}
  )
})

// Traffic cumulé de tous les hébergeurs
db.site.aggregate(
  { $match : {}},
  { $group : {_id: "traffic_total", total:{$sum: "$traffic"}}}
)


// Traffic cumulé de chaque hébergeur
db.site.aggregate(
  { $match : {}},
  { $group : {_id: "$hebergeur", total : { $sum: "$traffic" }}},
  { $sort : { total : -1 }}
)
// Quelle est la moyenne des likes par hébergeur ?
db.site.aggregate(
  { $match : {}},
  { $group : {_id: "$hebergeur", total : { $avg: "$likes" }}},
  { $sort : { total : -1 }}
)
// les likes sont aussi en string, on les passe en int
var cursor = db.site.find();

cursor.forEach(function(singleSite){
  db.site.update(
    {_id : singleSite._id},
    { $set: {likes : parseInt(singleSite.likes)}}
  )
})
// On peut maintenant calculer la moyenne
db.site.aggregate(
  { $match : {}},
  { $group : {_id: "$hebergeur", total : { $avg: "$likes" }}},
  { $sort : { total : -1 }}
)
// Augmenter le nombre de 50 likes les sites de Gandi
db.site.update(
  { hebergeur : "Gandi"},
  { $inc : {likes:50 }},
  { multi : true}
)
// exporter dans un fichier newwebsite.json le contenu de notre collection

mongoexport --db web --collection sites --out export_websites.json
// l'option --out permet de spécifier dans quel fichier  seront exportées les données. Si on l'omet, la sortie se fait directement à l'écran.

