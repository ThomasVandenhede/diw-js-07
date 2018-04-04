var boite = {
	contenu: 'sucre',
	quoiDedans: () => {
		console.log(this.contenu);
		// this fait référence au contexte d'origine.
	}
};

boite.quoiDedans();
// affiche undefined !

var boite = {
	contenu: 'sucre',
	quoiDedans: function () {
		console.log(this.contenu);
		// this fait référence au contexte d'exécution.
	}
};

boite.quoiDedans();
// affiche sucre' !
