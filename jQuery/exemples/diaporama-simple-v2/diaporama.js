var elementsDiaporama = {
  transition: 400,
  duree: 1000,
  verification: function(execution) {
    if ($('.diaporama li').length > 1) {
      for (var element of execution) {
        this[element]();
      }
    }
  },
  placement: function() {
    //Calcul la largeur de la fenêtre -> largeur du diaporama
      this.largeurFenetre = $('body').innerWidth();
      $('.diaporama').width(this.largeurFenetre * 0.8).css('margin-left',this.largeurFenetre * 0.1);
    //Calcul de la hauteur du ul en fonction de la hauteur des images
      var heightLi = 2000;
      $('.diaporama li').show();
      $('.diaporama img').each(function(index,element) {
        var heightImage = $(element).height();
        if (heightImage < heightLi) {
          heightLi = heightImage;
        }
      });
      $('.diaporama ul').height(heightLi);
  },
  initialisation: function() {
    $('.diaporama li:not(:first-child)').hide();
    $('.diaporama li:first-child').show().addClass('diapoVisible');
    $('.diaporama li').each(function(index,element) {
      $(element).addClass('cible' + (index + 1));
    });
    if (!$('.diaporama .spans').length) {
      var spans = '<div class="spans">';
      for (var i=0;i<$('.diaporama img').length;i++) {
        spans += '<span class="cible' + (i + 1) + '"></span>';
      }
      $('.diaporama').append(spans + '</div>');
    }
    $('.spans span').removeClass('diapoVisible');
    $('.spans span:first-child').addClass('diapoVisible');
  },
  changementDiapo: function() {
    if (this.arret) {
      clearInterval(this.arret);
    }
    elementsDiaporama.arret = setInterval(function() {
      var diapoVisible = $('.diaporama li.diapoVisible');
      var spanVisible = $('.diaporama span.diapoVisible');
      diapoVisible.fadeOut(elementsDiaporama.transition).removeClass('diapoVisible');
      spanVisible.removeClass('diapoVisible');
      if (diapoVisible.next().length) {
        diapoVisible.next().fadeIn(elementsDiaporama.transition).addClass('diapoVisible');
        spanVisible.next().addClass('diapoVisible');
      } else {
        elementsDiaporama.initialisation();
      }
    },elementsDiaporama.duree);
  },
  debut: function() {
    this.verification(['placement','initialisation','changementDiapo']);
  }
};

$(function() {
  elementsDiaporama.debut();
  $(window).resize(function() {
    elementsDiaporama.debut();
  })
});
