// https://docs.mongodb.com/manual/tutorial/iterate-a-cursor/
// https://docs.mongodb.com/manual/reference/method/js-cursor/

var cursor = db.piscines.find({
  zipCode: 75015
})
cursor.next() // affiche le document suivant

cursor.hasNext() // vérifie si le curseur contient encore des docuemnts

cursor.forEach(function(doc) {
  printjson(doc.name) // affiche une propriété (format JSON)
})


var cursor = db.piscines.find(
  {
    zipCode: 75015
  }
)
var cursorArray = cursor.toArray() // retourne un tableau de documents et épuise le curseur
for (var i = 0; cursorArray[i]; i++) {
  print(cursorArray[i].name) // affiche une propriété
}


var arr = [];
var cursor = db.piscines.find(
  {
    zipCode: 75015
  }
)
cursor.forEach(function(doc) {
  arr.push(doc.name)
})
var str = arr.join('@')
printjson(str)











var scoreCuisine = {}
var restos = db.restaurants.find()
restos.forEach(function(resto) {
  if (scoreCuisine[resto.cuisine] === undefined) {
    scoreCuisine[resto.cuisine] = 1;
  } else {
    scoreCuisine[resto.cuisine]++
  }
})
var tableauScores = [];
for (var nomCuisine in scoreCuisine) {
  tableauScores.push([nomCuisine, scoreCuisine[nomCuisine]])
}
tableauScores.sort(function(a, b) {
  return a[1] - b[1];
})
printjson(tableauScores)