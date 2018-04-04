'use strict';

window.onload = function (){

  /**
  * A Propos des styles
  **/
  //var monContainer = window.document.getElementById('container');

  // Pour accéder au propriété de style provenant du code CSS
  //var stylesDuFichierCSS = window.getComputedStyle(monContainer);

  //console.log(stylesDuFichierCSS);

  // Pour accéder au propriété de style provenant du code HTML (attribut style)
  //console.log(monContainer.style);

  /*** animation avec .setTimeout() ***/
  /*
    var moveDown = function(){
      var top = monContainer.style.top;
      top = parseFloat(top);
      if (isNaN(top)) {
        top = 0;
      }
      monContainer.style.top = top + 2 + 'px';

      if (parseFloat(monContainer.style.top) < 100) {
        window.setTimeout(moveDown, 100);
      }
    }

    moveDown();
  */

  /*** animation avec .setInterval() ***/
  /*
  var moveDown = function(){
    var top = monContainer.style.top;
    top = parseFloat(top);
    if (isNaN(top)) {
      top = 0;
    }
    monContainer.style.top = top + 2 + 'px';
  }

  var idInterval = window.setInterval(function(){
    if (isNaN(parseFloat(monContainer.style.top)) || parseFloat(monContainer.style.top) < 100) {
      moveDown();
    } else {
      window.clearInterval(idInterval);
    }
  }, 100);
  */

  /*** animation avec .requestAnimationFrame() ***/
  /*
  var moveDown = function(){
    var top = monContainer.style.top;
    top = parseFloat(top);
    if (isNaN(top)) {
      top = 0;
    }
    monContainer.style.top = top + 2 + 'px';
  }

  var ancienTimestamp;
  var aExecuterAuProchainRafraichissement = function(timestamp){

    var timestampActuel = timestamp;
    // Si l'ancien timestamp n'a pas été défini
    if (!ancienTimestamp) {
      // on l'initialise à la valeur du timestamp actuel
      ancienTimestamp = timestampActuel;
    }

    // Si la différence entre l'ancien timestamp et le timestamp actuel est de 200ms
    if (timestampActuel - ancienTimestamp >= 100) {
      var tempsEcoule = timestampActuel - ancienTimestamp;
      console.log('Temps écoulé : ' + tempsEcoule);
      // On réinitialise l'ancien timestamp à la valeur du timestamp actuel
      ancienTimestamp = timestampActuel;
      // dans ce cas là on peut effectuer des opérations...
      moveDown();
    }

    if (parseFloat(monContainer.style.top) < 100) {
      window.requestAnimationFrame(aExecuterAuProchainRafraichissement);
    }
  }

  aExecuterAuProchainRafraichissement(0);
  */

  var animation = {
    element: window.document.getElementById('container'),
    moveDown: function(){
      console.log('moveDown');
      console.log(this);
      var top = this.element.style.top;
      top = parseFloat(top);
      if (isNaN(top)) {
        top = 0;
      }
      this.element.style.top = top + 2 + 'px';
      
      if (parseFloat(this.element.style.top) < 100) {
        // TRANSFERTS DE CONTEXTE
        // Utiliser la closure
        var that = this;
        window.setTimeout(function(){
          that.moveDown();
        }, 100);

        // Utiliser la méthode .bind()
        /*
        window.setTimeout(this.moveDown.bind(this), 100);
        */

        // ES6 : fonctions fléches
        /*
        window.setTimeout(() => {
          this.moveDown();
        }, 100);
        */
      }
    }
  };

  animation.moveDown();

}








