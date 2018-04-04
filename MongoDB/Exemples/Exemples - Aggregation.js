/*
https://docs.mongodb.com/manual/core/aggregation-pipeline/index.html
https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/#db.collection.aggregate
https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/
https://docs.mongodb.com/manual/reference/operator/aggregation/
*/

/*
http://jmkhael.io/mongodb-aggregation-pipelines/
*/


db.piscines.aggregate([
  {
    $match: {}   // Sélection de toutes les piscines
  }, {
    $group: {
      _id: "$zipCode",
      total: {
        $sum: 1
      }
    }  // crée une collection temporaire avec comme champ _id le champ zipCode et définit un champ total incrémenté de 1  à chaque occurrence de zipCode
  }, {
    $sort: {
      total: -1,
      _id: 1
    }
  }, {
    $limit: 3
  }
]);


db.piscines.aggregate([
  {
    $match: {
    }   // Sélection de toutes les piscines
  }, {
    $group: {
      _id: "$zipCode",
      total: {
        $sum: 1
      }
    }  // crée une collection temporaire avec comme champ _id le champ zipCode et définit un champ total incrémenté de 1  à chaque occurrence de zipCode
  }, {
    $sort: {
      total: -1
    }  // On trie par total décroissant
  }
]);


db.piscines.aggregate([
  {
    $match: {
    }   // Sélection de toutes les piscines
  }, {
    $group: {
      _id: "$zipCode",
      total: {
        $sum: 1
      },
      codePostal: {
        $addToSet: "$zipCode"
      }
    }  // crée une collection temporaire avec comme champ _id le champ zipCode et définit un champ total incrémenté de 1  à chaque occurrence de zipCode
  }, {
    $project: {
      "Arrondissement": "$_id",
      "codePostal": 1,
      _id: 0,
      total: 1
    }
  }, {
    $sort: {
      total: -1
    }  // On trie par total décroissant
  }, {
    $limit: 5
  }
]);
