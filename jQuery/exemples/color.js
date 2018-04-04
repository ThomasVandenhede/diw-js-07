(function($) {
  jQuery.fn.color = function(couleur) {
    if (!couleur) {
      couleur = 'black';
    }
    this.each(function() {
      $(this).css('color',couleur);
    });
    return this;
  };
})(jQuery);
