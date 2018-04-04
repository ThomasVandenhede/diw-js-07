(function($) {
  jQuery.fn.diaporama = function(reglages) {
    var blockDiaporama = $(this);
    var elementsDiaporama = {
      verification: function(execution) {
        if (blockDiaporama.find('li').length > 1) {
          for (var element of execution) {
            this[element]();
          }
        }
      },
      placement: function() {
        //Calcul la largeur de la fenêtre -> largeur du diaporama
          this.largeurFenetre = $('body').innerWidth();
          blockDiaporama.addClass('diaporama').width(this.largeurFenetre * 0.8).css('margin-left',this.largeurFenetre * 0.1);
        //Calcul de la hauteur du ul en fonction de la hauteur des images
          var heightLi = 2000;
          blockDiaporama.find('li').show();
          blockDiaporama.find('img').each(function(index,element) {
            var heightImage = $(element).height();
            if (heightImage < heightLi) {
              heightLi = heightImage;
            }
          });
          blockDiaporama.find('ul').height(heightLi);
      },
      initialisation: function() {
        blockDiaporama.find('li:not(:first-child)').hide();
        blockDiaporama.find('li:first-child').show().addClass('diapoVisible');
      },
      changementDiapo: function() {
        if (this.arret) {
          clearInterval(this.arret);
        }
        elementsDiaporama.arret = setInterval(function() {
          var diapoVisible = blockDiaporama.find('li.diapoVisible');
          diapoVisible.fadeOut(elementsDiaporama.transition).removeClass('diapoVisible');
          if (diapoVisible.next().length) {
            diapoVisible.next().fadeIn(elementsDiaporama.transition).addClass('diapoVisible');
          } else {
            elementsDiaporama.initialisation();
          }
        },elementsDiaporama.duree);
      },
      debut: function() {
        this.verification(['placement','initialisation','changementDiapo']);
      }
    };
    if (!reglages) {
      reglages = {};
    }
    var reglagesDiaporama = ['duree','transition'];
    var defaut = [2000,400];
    for (var i = 0; reglagesDiaporama[i];i++) {
      if (!reglages[reglagesDiaporama[i]]) {
        elementsDiaporama[reglagesDiaporama[i]] = defaut[i];
      } else {
        elementsDiaporama[reglagesDiaporama[i]] = reglages[reglagesDiaporama[i]];
      }
    }
    this.each(function() {
      elementsDiaporama.debut();
      $(window).resize(function() {
        elementsDiaporama.debut();
      })
    });
    return this;
  };
})(jQuery);
