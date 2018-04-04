/*
MongoDB 3.6.2
2018-01-29
*/

/*
SQL to MongoDB Mapping Chart
https://docs.mongodb.com/manual/reference/sql-comparison/
*/

/*
CRUD
https://docs.mongodb.com/manual/crud/
*/

// use videoclub

db.films.drop()

// db.createCollection(name, options)
// https://docs.mongodb.com/manual/reference/method/db.createCollection/
db.createCollection('films')


/*
CRUD - Create
*/


db.films.insert({
  titre: "Rambo",
  annee: 1982,
})
// WriteResult({ "nInserted" : 1 })

db.films.insert([{
  titre: "Rambo II: La mission",
  annee: 1985
}, {
  titre: "Rambo III",
  annee: 1988
}, {
  titre: "Terminator",
  annee: 1984
}, {
  titre: "Retour vers le futur",
  annee: 1985
}])
/*
BulkWriteResult({
  "writeErrors" : [ ],
  "writeConcernErrors" : [ ],
  "nInserted" : 2,
  "nUpserted" : 0,
  "nMatched" : 0,
  "nModified" : 0,
  "nRemoved" : 0,
  "upserted" : [ ]
})
*/

// On préfère maintenant insertOne / insertMany
db.films.insertOne({
  titre: "Fight Club",
  annee: 1999
})
/*
{
  "acknowledged" : true,
  "insertedId" : ObjectId("5a6f98f0ea530ec580596e53")
}
*/

db.films.insertMany([{
  titre: "Alien - Le 8ème passager",
  annee: 1979
}, {
  titre: "Aliens - Le retour",
  annee: 1986
}, {
  titre: "Terminator 2 - Le jugement dernier",
  annee: 1991
}, {
  titre: "Dune",
  annee: 1984
}, {
  titre: "S.O.S. fantômes",
  annee: 1984
}, {
  titre: "Retour vers le futur 2",
  annee: 1989
}, {
  titre: "Retour vers le futur: 3e partie",
  annee: 1990
}])
/*
{
  "acknowledged" : true,
  "insertedIds" : [
    ObjectId("5a6f999eea530ec580596e54"),
    ObjectId("5a6f999eea530ec580596e55")
  ]
}
*/


/*
CRUD - Read

https://docs.mongodb.com/manual/reference/method/db.collection.find/
https://docs.mongodb.com/manual/reference/operator/query/
*/

db.films.count() // Affichaage le nopmbre de documents dans la collection films

db.films.find() // Affichaage dans l'ordre "naturel": l'ordre d'insertion
db.films.find().count() // Sans requête, équivalent à db.films.count()

db.films.find().pretty() // mise en forme des documents retournés

db.films.find().limit(3) // limite le nombre de docuemnts retournés

db.films.find().sort( { titre: 1 } ) // Trie les documents retournés sur le champ "titre", dans l'ordre croissant
db.films.find().sort( { titre: -1 } ) // Trie les documents retournés sur le champ "titre", dans l'ordre décroissant

db.films.find( { annee: 1984 } ) // Retourne les films sortis en 1984

db.films.find( { annee: 1984 } ).limit(2) // Retourne au maximum 2 films sortis en 1984

db.films.find( { annee: 1984 } ).sort( { titre: 1 } ) // Retourne les films sortis en 1984, triés par "titre" dans l'ordre croissant
db.films.find( { annee: 1984 } ).sort( { titre: 1 } ).count()
db.films.find( { annee: 1984 } ).sort( { titre: 1 } ).limit(2)
db.films.find( { annee: 1984 } ).sort( { titre: 1 } ).limit(2).count() // ATTENTION: count retourne le nombre total de résultats correspondants à la requête, sans tenir compte de la limite
// db.films.find( { annee: 1984 } ).sort( { titre: 1 } ).count().limit(2) // E QUERY    [thread1] TypeError: db.films.find(...).sort(...).count(...).limit is not a function

// $regex
// https://docs.mongodb.com/manual/reference/operator/query/regex/
db.films.find( { titre: /Alien/ } ) // 2
db.films.find( { titre: /alien/ } ) // 0

db.films.find( { titre: { $eq: "Dune"} } )
db.films.find( { titre: { $regex: /retour/i} } )
// équivalent à
db.films.find( { titre: { $regex: /retour/, $options: "i" } } )

db.films.find( { titre: { $regex: /mi/i} } )

db.films.find( { titre: { $regex: /retour/ } } ) // 1 (Aliens - Le retour)
db.films.find( { titre: { $regex: /^retour/, $options: "m" } } ) // 0
db.films.find( { titre: { $regex: /^retour/, $options: "mi" } } ) // 0

db.films.find( { titre: /Alien/i }, { titre:1 } )

db.films.find( { $or: [ {annee: 1984}, {annee: 1989} ] } )
db.films.find( { $and: [ {annee: 1984}, {title: "Dune"} ] } )

// trouver un site via son _id
db.films.find({_id: ObjectId("5a70340e5bc974f62033fc5a")})


/*
https://docs.mongodb.com/manual/core/index-case-insensitive/
*/

// collations : case insensitive search

// Regex
db.restaurants.find({
  "address.street" : /Morris Park Ave/
}).count()

db.restaurants.find({
  "address.street": RegExp('Morris Park Ave')
})

