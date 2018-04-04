// transformer un littéral en texte
JSON.stringify({
	propriete1: 10,
    propriete2: [
		'Bonjour',
		'Au Revoir'
	],
	propriete3: function(){}
});

// donne le JSON '{"propriete1": "10","propriete2": ["Bonjour","Au Revoir"]}'

// transformer un texte en littéral
// JSON : Notation Objet JavaScript
 JSON.parse('{"propriete1": "10","propriete2": ["Bonjour","Au Revoir"]}');
 
/* donne l'Objet :
{
	propriete1: 10,
    propriete2: [
		'Bonjour',
		'Au Revoir'
	]
}
*/