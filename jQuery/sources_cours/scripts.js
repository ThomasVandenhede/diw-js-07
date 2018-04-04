$( document ).ready(function(){
  function masquer(etat){
    changementMenu();
    $('.content').each(function(){
      $(this).css('display',etat);
    });
  };
  function masquageFiltre(duree){
    $('#filtre').animate({opacity: 0}, duree, function(){
      $(this).hide();
    });
  };
  function changementMenu(){
    if($(window).width() < 864){
      var refHeader = $('header');
      var duree = 600;
      var valeur = refHeader.height();
      if (parseFloat(refHeader.css('top')) == -valeur) {
        $('#filtre').animate({opacity: 0.8}, duree).show();
        refHeader.animate({top: 0}, duree);
      } else {
        refHeader.animate({top: -valeur}, duree);
        masquageFiltre(duree);
      }
    }
  };
  $(window).resize(function(){
    if ($(window).width() >= 864) {
      masquageFiltre(100);
      if ($('header').attr('style')) {
        $('header').removeAttr('style');
      }
    }
  });
  $('#bouton-nav, nav li').click(function(){
    changementMenu();
  });
  $('h2>.triangle').on('click',function(){
    $(this).toggleClass('haut bas');
    $(this).parent().siblings('.content').toggle();
  });
  $('#masquage').on('click',function(){
    var balise = $(this);
    if (balise.text() == 'Tout replier') {
      balise.text('Tout afficher');
      masquer('none');
    } else {
      balise.text('Tout replier');
      masquer('block');
      changementMenu()
    }
  });
});
