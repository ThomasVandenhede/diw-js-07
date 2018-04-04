function monOutil(element) {
  var debut = element.slice(0,1);
  var element;
  var balises;
  switch (debut) {
    case '#':
      element = element.slice(1);
      balises = document.getElementById(element);
      break
    case '.':
      element = element.slice(1);
      balises = document.getElementsByClassName(element);
      break
    default:
      balises = document.getElementsByTagName(element);
  }

  return {
    balises: balises,
    debut: debut,
    balayage: function(outil){
      if (this.debut == '#') {
        outil(this.balises);
      } else {
        for (var i=0;this.balises[i];i++) {
          outil(this.balises[i]);
        }
      }
    },
    hide: function(){
      this.balayage(function(cible){
        cible.style.display = 'none';
      });
      return this;
    },
    show: function(){
      this.balayage(function(cible){
        cible.style.display = 'block';
      });
      return this;
    },
    color: function(teinte){
      this.balayage(function(cible){
        cible.style.color = teinte;
      });
      return this;
    }
  };
};
