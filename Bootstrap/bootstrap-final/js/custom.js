$(function() {
  
  // Déclenchement du scrollspy
  $('.scrollflow').scrollspy({ target: '#list-example' });
  
  
  // Handler for .ready() called.
  console.log('custom.js file loaded');
  
  // Position de notre première progress bar
  var position = $( ".progress-bar:first" ).offset();
  //console.log("Position de la première progress-bar : " + position.top);
  
  // Variable pour savoir si l'animation a déjà été lancée
  var alreadyLaunched = false;
  
  // On observe les scroll
  $( window ).scroll(function() {
    //console.log($(document).scrollTop());
    // Si notre position actuelle est supérieure à la position de notre première progress bar et que l'animation n'a pas déjà été lancée
    if(($(document).scrollTop() > (position.top - 500)) && (alreadyLaunched == false)){
      // On change immédiatement la valeur de alreadyLaunched
      alreadyLaunched = true;
      
      // Alors on déclenche l'animation
      console.log("Tu peux commencer l'animation !!");
        $('.progress-bar').each(function(key, value) { // Pour chaque progress-bar
        // On fait évoluer la propriété width en fonction de la valeur de l'attribut aria-valuenow
        //console.log($(this).attr('aria-valuenow'));
        $(this).animate({
          width: $(this).attr('aria-valuenow')+"%"
        }, 5000, function() {
          // Animation complete.
          console.log('animation terminée');
        });
      });
    }
  });
  <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
  // Cibler les progress bars
  
});