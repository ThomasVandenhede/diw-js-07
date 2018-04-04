// Dans la collection "piscines" de la base "paris", trouver en utilisant les opérateurs de requête

// les piscines qui sont dans le 13e arrondissement
db.piscines.find({zipCode: {$eq: 75013}})

// est équivalent à :
db.piscines.find({zipCode: 75013})

// les piscines qui ne sont pas le 13e arrondissement
db.piscines.find({zipCode: {$ne: 75013}})

// En affichant uniquement le nom
db.piscines.find({zipCode: {$ne: 75013}}, {name: 1, _id: 0})

// les piscines qui sont dans le 13e et celles qui sont dans le 14e arrondissement

// Soit avec un $or
db.piscines.find({
  $or: [
    {zipCode: {$eq: 75013}},
    {zipCode: {$eq: 75014}}
  ]
}, {name: 1, _id: 0})
// Equivalent à
db.piscines.find({
  $or: [
    {zipCode: 75013},
    {zipCode: 75014}
  ]
}, {
  name: 1, _id: 0
})

// Soit avec un $in
db.piscines.find({ zipCode: { $in: [75013, 75014] } }, { name: 1, _id: 0 })

// les piscines qui ne sont pas dans le 15, 16, 17 et 18e arrondissement
db.piscines.find({ zipCode: { $nin: [75015, 75016, 75017, 75018] } }, { name: 1, _id: 0 })

// En triant par code postal descendant:
db.piscines.find({ zipCode: { $nin: [75015,75016,75017, 75018] } }, { name: 1, zipCode: 1, _id: 0 }).sort({ zipCode: -1 })

// Un objet ensemble de résultats de Mongo s'appelle un curseur
var monCurseur = db.piscines.find({ zipCode: { $nin: [75015, 75016, 75017, 75018 ] } }, { name: 1, zipCode: 1, _id: 0 })
monCurseur.sort({zipCode:-1})
