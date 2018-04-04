(function() {
  'use strict';

  $(document).ready(function() {
    console.log('jQuery ready');

    $.ajax({
      url: '/contenu-texte',
      method: 'GET',
      dataType: 'text',
      success: function(donneesRecues) {
        console.log(donneesRecues);
        $('body').append('<p>' + donneesRecues + '</p>');
      },
      error: function(jqXhrObj) {
        console.log(jqXhrObj);
      }
    });

  }); // jQuery ready

}()); // IIFE 
