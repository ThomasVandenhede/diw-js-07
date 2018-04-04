window.onload = function(){
  function changementClass(cible,myClass,indication){
    cible.className = myClass;
    document.getElementById('indication').innerHTML = indication;
  }

  var boutons = document.getElementsByTagName('button');
  for (var i = 0;boutons[i];i++) {
    boutons[i].onclick = function(){
      changementClass(document.getElementById('boite'),this.getAttribute('action'),this.getAttribute('legende'));
    };
  }

  var selects = document.getElementsByTagName('select');
  for (var i = 0;selects[i];i++) {
    selects[i].onchange = function(){
      document.getElementById(this.getAttribute('cible')).style[this.getAttribute('type')] = this.value;
    }
  }
};
