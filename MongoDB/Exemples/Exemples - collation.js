/*
https://docs.mongodb.com/manual/reference/collation/#collation-document-fields
*/

// Recherche avec tri par défaut (case sensitive)
db.piscines.find({}, { "name": 1, _id: 0 }).sort( { name: 1 } )

// Recherche avec collation (interclassement )
db.piscines.find({}, { "name": 1, _id: 0 }).collation({
  locale: "fr",
  strength: 2
}).sort( { name: 1 } )