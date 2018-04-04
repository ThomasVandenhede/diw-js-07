$(function() {
  var largeurFenetre, hauteurFenetre;
  var largeurBloc, hauteurBloc;
  var variation = 5;
  function calculDimensions() {
    largeurFenetre = $('body').innerWidth();
    hauteurFenetre = $('body').innerHeight();
  };
  calculDimensions();
  function init() {
    $('#bloc').width('20px').height('20px');
    largeurBloc = hauteurBloc = 20;
  };
  init();
  var arret;
  function action() {
    arret = setInterval(function(){
      if (largeurBloc >= largeurFenetre / 2 || hauteurBloc >= hauteurFenetre / 2 || largeurBloc <= 20) {
        variation = -variation;
      }
      largeurBloc = largeurBloc + variation;
      hauteurBloc = hauteurBloc + variation;
      $('#bloc').height(hauteurBloc).width(largeurBloc);
    },1000);
  };
  action();

  $(window).resize(function() {
    clearInterval(arret);
    calculDimensions();
    init();
    action();
  });
})
