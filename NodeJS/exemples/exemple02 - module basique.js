console.log('Exemple 2.js');
// chemin absolu :
//module.require(`C:/devjs/node/exemples/exemple2-module.js`);
// chemin relatif :
// module.require(`./exemple2-module.js`);
// Avec le fichier dans le dossier [node_modules]
//module.require(`exemple2-module.js`);
// Avec le code dans un fichier index.js dans le dossier [node_modules]
let parIciMonPetit = module.require(`exemple2-module`);

console.log(parIciMonPetit);

let encoreUneFois = module.require(`exemple2-module`);

console.log(encoreUneFois);