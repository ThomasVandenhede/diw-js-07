(function() {
  'use strict';

  $(document).ready(function() {
    console.log('jQuery ready');

    $('#btn1').on('click', function() {

      $.ajax({
        url: '/contenu-json',
        method: 'GET',
        dataType: 'json',
        success: function(responseServeur) {
          console.log(responseServeur);
          $('body').append('<h2>' + responseServeur.nom + '</h2>');
          $('body').append('<p>' + responseServeur.presentation + '</p>');
          $('body').append('<div><img src="' + responseServeur.image + '"></div>')
        },
        error: function(objetJqXHR) {
          console.error(objetJqXHR);
        }
      });

    })

  }); // jQuery ready

}()); // IIFE 
