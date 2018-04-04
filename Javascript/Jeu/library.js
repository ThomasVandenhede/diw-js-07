var reponse;

var nombreAleatoire = function(){
		return (Math.round(Math.random() * 2)) + 1;
}

var repondre = function(){
	var inputs = window.document.getElementsByName('reponse');
	for(i=0;inputs[i];i++){
		if(inputs[i].checked){
			reponse = inputs[i].value;
		};
	}
	tour();
};


var resultat = function(txt){
	//window.document.getElementById('resultat').textContent = txt;

	  var monDiv = document.getElementById('resultat');
	  monDiv.innerHTML = txt;
}
