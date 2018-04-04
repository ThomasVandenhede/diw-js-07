// Retrouver les 5 premières piscines par ordre alphabétique ( et dont le champ zipCode existe)
db.piscines.find( { zipCode: { $exists: true } } )
db.piscines.find( { zipCode: { $exists: true } }, { _id: 0, name: 1 } )
db.piscines.find( { zipCode: { $exists: true } }, { _id: 0, name: 1 } ).sort( { name: 1 } )

// Ajoutez 2 piscines avec un champ nom au lieu de name
db.piscines.insert([
  { nom: "Ma piscine", address: "2 Rue de la flaque", lon: 48.888, lat: 2.344 },
  { nom: "La pataugeoire", address: "6 Rue de la petite mer", lon: 48.864, lat: 2.345 }
])

// Si je compte mes piscines, j'en ai donc 33
db.piscines.count()
// Compter uniquement les piscines dont le champ name est présent
db.piscines.find( { name: { $exists: true } } ).count()
// équivalent à
db.piscines.count( { name: { $exists: true } } )

// Renvoie toutes les piscines ayant effectivement le champ nom
db.piscines.find( { nom: { $exists: true } } ).pretty()

// Limite à 5 résultats
db.piscines.find( { nom: { $exists:true } } ).limit( 5 )

// En les triant par ordre alphabétique (case sensitive)
db.piscines.find( { name: { $exists: true } } ).sort( {name: 1 } )

// En les triant par ordre alphabétique (case insensitive)

// Ce n'était pas possible nativement avec mongo avant la version 3.4
// Il fallait utiliser des subterfuges pour y arriver
// par exemple recréer un champ avec tout en minuscule...

// En plus en limitant les champs retournés au nom
db.piscines.find({ name: { $exists: true}}, {name: 1,_id:0}).limit(5).sort({name: 1})