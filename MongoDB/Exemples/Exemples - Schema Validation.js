/*
  Schema Validation
  https://docs.mongodb.com/manual/core/schema-validation/index.html

  https://docs.mongodb.com/manual/reference/operator/query/jsonSchema/#op._S_jsonSchema
*/

db.createCollection("eleves", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [ "prenom", "annee", "major", "test" ],
      properties: {
        test: {
          bsonType: "object",
          properties: {
            a: {
              bsonType: "string"
            },
          },
          description: "Obligatoire."
        },
        prenom: {
          bsonType: "string",
          description: "Obligatoire. Champ de type chaîne"
        },
        year: {
          bsonType: "int",
          minimum: 2017,
          maximum: 3017,
          exclusiveMaximum: false,
          description: "Obligatoire. Champ de type entier de [ 2017, 3017 ]"
        },
        major: {
          enum: [ "PHP", "JavaScript", null ],
          description: "Obligatoire. Doit faire partie des valeurs autorisées"
        }
      }
    }
  }
})
/*
If the validationAction is error (the default), MongoDB rejects any insert or update that violates the validation criteria.
If the validationAction is warn, MongoDB logs any violations but allows the insertion or update to proceed.
*/

db.eleves.insert({
  "prenom": "Pierre",
  "annee": 2018,
  "test": {

  },
  "major": "JavaScript"
})

db.eleves.insert({
  "prenom": "Guillaume",
  "major": "JavaScript"
})

