db.piscines.find( { "zipCode":{ $lte:75010 } },{ "_id":0, "zipCode":1, "address":1, "name":1 } ).pretty()
db.piscines.find( { "zipCode":{ $lte:75010 } },{ "_id":0, "zipCode":1, "address":1, "name":1 } ).sort( { "zipCode":1 } ) // avec triage
db.piscines.find( 
    {
        $and:[
            {"zipCode":{ $lte:75010 } },
            {"zipCode":{ $gte:75005 } }
        ]
    }, {"_id":0, "name":1, "zipCode":1}
).sort( { "zipCode":1 } )

// Dans la collection "piscines" de la base "paris", trouver en utilisant les opérateurs de requête

// les piscines qui sont dans le 13e arrondissement

// est équivalent à :


// les piscines qui ne sont pas le 13e arrondissement

// En affichant uniquement le nom


// les piscines qui sont dans le 13e et celles qui sont dans le 14e arrondissement

// Soit avec un $or

// Équivalent à

// Soit avec un $in

// les piscines qui ne sont pas dans le 15, 16, 17 et 18e arrondissement


// En triant par code postal descendant:

// les piscines dont le code postal est supérieur ou égal à 75013 triés par code postal descendant


// Les piscines situées à l'ouest de Notre Dame de Paris


// Et leur nombre

// Les piscines dont zipCode=75013 ET id=2929 avec l'opérateur $and et $eq

// On peut simplifier - uniquement l'opérateur $and

// Version la plus courte
