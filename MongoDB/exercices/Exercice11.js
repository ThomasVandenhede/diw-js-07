// Vélib


// Récupérer un fichier json des velib chez jcdecaux developer
// Importer dans la base paris, le fichier jcdecaux.json dans une collection velib

// Problème ! On n'a pas de champ codepostal ... On retrouve le code postal dans l'adresse.

// Mettez à jour tous les enregistrements en leur ajoutant un champ zipCode

// Quel est l'arrondissement de Paris ou il y a le plus de stations ? (avec un $in)


// OU plus élégant (avec aggregate)


// Quelle est la ville (hors Paris) qui a le plus de stations

// OU plus élégant (avec aggregate)

// Cherchez la piscine Dunois.

// Quelles sont les 5 stations velib les plus proches de la piscine Dunois ?
// Première version : en utilisant une fonction de calcul de distance
// Seconde version : en modifiant la structure de la collection et en utilisant l'opérateur géographique $near



