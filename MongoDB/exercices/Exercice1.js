/*

https://docs.mongodb.com/manual/mongo/

*/

// Affiche la liste des bases de données
show databases; // version longue
show dbs; // version courte

// Sélectionne une base (même si elle n'existe pas)
use videoclub;

// Affiche la liste des collections
show collections;

// Affiche la base de données courante
db
// Note: database ne foncitonne pas (pas de vesion longue)

// Insérer un film
// Note: on peut créer la collection implicitement (ici on crée automatiquement une collection "films")
// explicitment : db.createCollection('films')

// Insérer un document
db.films.insertOne({
  titre: "Inception",
  annee: 2010
})


db.films.insertOne({
  titre: "Orange mécanique",
  annee: 1971,
  acteurs: ["Malcolm McDowell", "Patrick Magee", "Michael Bates"]
})

db.films.insertOne({
  titre: "Captain America",
  annee: 2011,
  realisateur: {
    prenom: "Joe",
    nom: "Johnston"
  }
})


db.films.insertOne({
  choucroute: "Test"
})

/*
insert
insertOne
insertMany
*/

db.films.insertMany([{
  titre: "CCC",
  annee: 2011,
  realisateur: {
    prenom: "JoeC",
    nom: "JohnstonC"
  }
}, {
  titre: "Dddd",
  annee: 2011,
  realisateur: {
    prenom: "JoeD",
    nom: "JohnstonD"
  }
}])

/*
Opérateurs de requête et de projection
https://docs.mongodb.com/manual/reference/operator/query/index.html
*/

// Rechercher les documents ayant une propriété titre ayant la valeur "Rambo"
db.films.find({titre:"Rambo"})
// équivalent à
db.films.find({titre:{$eq:"Rambo"}})

// Rechercher les documents ayant une propriété annee ayant la valeur 2010
db.films.find({annee:2010})
// équivalent à
db.films.find( {
  annee: {
    $eq: 2010
  }
})

// Rechercher les documents ayant une propriété annee ayant une valeur listée dans le tableau
db.films.find( {
  annee: {
    $in: [2010, 2008]
  }
})

// Rechercher les documents ayant une propriété annee ayant une valeur supérieure ou égale à 2007
db.films.find( {
  annee: {
    $gte: 2007
  }
})

// Projection : retourner uniquement les champs demandés
db.films.find({"annee":2011}, {"realisateur.nom":1})

// Projections
db.films.find( { annee: 2010 }, { titre: 1, id: 0 } )
