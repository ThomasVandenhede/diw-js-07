const maFonction = () => {
	let division = 2 / 3;

	console.log(division);

	for (let i = 1; i < 10; i++) {
		console.log(`Clap ${i} fois !`);
	}
};

let boite = {
	texte: 'Hello !',
	methode: function(){
		setTimeout(() => {

		   console.log(this.texte);

	    }, 3000);
	}
};

boite.methode();

