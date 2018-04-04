'use strict';

/* Compatibilité Inter Navigateur*/

// On peut essayer de détécter le navigateur sur lequel on est :
window.navigator.appName;

window.navigator.userAgent; // String


window.navigator.userAgent.length;
// équivaut à (coercition avec String) :
var objetString = new String(window.navigator.userAgent);
objetString.length;
/*
var ie = window.navigator.userAgent.search('Trident');

if (ie > -1) {
  console.log('Internet Explorer');
} else {
  var awk = window.navigator.userAgent.search('AppleWebKit');
  var chrome = window.navigator.userAgent.search('Chrome');
  if (awk > -1) {
    if (chrome > -1) {
      console.log('Chrome');
    } else {
      console.log('Safari');
    }
  } else {
    console.log('Firefox');
  }
}
*/
//

var boiteDePetitsFours = [
  'blinis au saumon',
  'foie gras au pain d\épice',
  'saint jacques sur fondue de poireaux',
  'huitres'
]; // équivaut à
/*
var boiteDePetitsFours = new Array(
  'blinis au saumon',
  'foie gras au pain d\épice',
  'saint jacques sur fondue de poireaux',
  'huitres'
);
*/

/*
var pourChaque = function(tableau, uneFonction) {
  for (var i = 0; i < tableau.length; i++) {
    uneFonction(tableau[i]);
  }
}
*/

// .forEach n'existe pas sur IE < 8. On crée donc un POLYFILL

if (Array.prototype.forEach === undefined) {
  Array.prototype.forEach = function(uneFonction) {
    for (var i = 0; i < this.length; i++) {
      uneFonction(this[i]);
    }
  }
}

boiteDePetitsFours; // (objet) tableau
/*
boiteDePetitsFours.forEach(function (unPetitFour) {
  console.log('Je mange un ' + unPetitFour);
});
*/

// Autre exemple :

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

// On peut utiliser des frameworks tels que Modernizr ou Shim JS qui contiennt les polyfills les plus connus.

/* Animations */
//window.onload = function(){};
// équivaut à
//window.addEventListener('load', function(){});

// Permet d'éxecuter mon code un peu plus tôt :
window.addEventListener('DOMContentLoaded', function(){
  var aGauche = false;
  var aDroite = false;
  var enHaut = false;
  var enBas = false;
  
  
  var monCarre = window.document.getElementById('carre');
  monCarre.style.top = monCarre.style.top || '0px';
  monCarre.style.left = monCarre.style.left || '0px';

  // Quand j'appuie sur une touche
  window.addEventListener('keyup', function(evtClavier){
    window.clearInterval(aGauche);
    window.clearInterval(aDroite);
    window.clearInterval(enHaut);
    window.clearInterval(enBas);
    aGauche = false;
    aDroite = false;
    enHaut = false;
    enBas = false;
  });

  // Quand j'appuie sur une touche
  window.addEventListener('keypress', function(evtClavier){
    console.log(evtClavier);
    var keyCode = evtClavier.keyCode;
    switch (keyCode) {
      case 37:
        // à gauche
        if (aGauche === false) {
          aGauche = window.setInterval(function(){
            monCarre.style.left = (parseFloat(monCarre.style.left) - 2) + 'px';
          },1);
        }
      break;
      case 38:
        // en haut
        if (enHaut === false) {
          enHaut = window.setInterval(function(){
            monCarre.style.top = (parseFloat(monCarre.style.top) - 2) + 'px';
          },1);
        }
      break;
      case 39:
        // à droite
        if (aDroite === false) {
          aDroite = window.setInterval(function(){
            monCarre.style.left = (parseFloat(monCarre.style.left) + 2) + 'px';
          },1);
        }
      break;
      case 40:
        // en bas
        if (enBas === false) {
          enBas = window.setInterval(function(){
            monCarre.style.top = (parseFloat(monCarre.style.top) + 2) + 'px';
          },1);
        }
      break;
    }
  });
});


var animator = {
  period: 200,
  callback: false,
  start: function(callback, period){
    this.status = 'started';
    callback = callback || this.callback;
    this.callback = callback;
    period = period || this.period;
    this.period = period;
    this.init(callback, period);
  },
  stop: function(){
    this.status = 'stopped';
  },
  status: 'stopped',
  init: function(callback, period) {
    var that = this;
    var initialTimestamp;
    var nextRefresh = function(timestamp){
      if (that.status === 'started') {
        if (initialTimestamp === undefined) {
          initialTimestamp = timestamp;
        } else {
          var decay = timestamp - initialTimestamp;
          if (decay >= period) {
            initialTimestamp = timestamp;
            callback();
          }
        }
        window.requestAnimationFrame(nextRefresh);
      }
    };
    nextRefresh(0);
  }
}

/*animator.start(function(){
  console.log('Hello !');
}, 200);*/

/* Evenements */
window.addEventListener('DOMContentLoaded', function(){

  var monCarre = window.document.getElementById('carre');
  /*monCarre.addEventListener('mousemove', function(evtSouris){
    console.log(evtSouris);
    
  });*/
  window.addEventListener('mousemove', function(evtSouris){

    monCarre.style.top = evtSouris.clientX + 'px';

  });

});

/* Technique ninja numéro 56 ;) */
// Chainage :
var yannick = {
  enHaut: function(){
    console.log('En Haut !');
    this; // l'objet reférencé dans yannick.
    return this;
  },
  enBas: function(){
    console.log('En Bas !');
    return this;
  },
  cesSoireesLa: function(){
    console.log('Ces Soirées Là !');
    return this;
  }
}

//yannick.enHaut().enBas().cesSoireesLa().enHaut().cesSoireesLa();

// Design pattern fonction usine
var jSami = (function(){

  var superChoregraphie = {
    css: function(){
      console.log('En Haut !');
      this; // l'objet reférencé dans yannick.
      return this;
    },
    fadeTo: function(){
      console.log('En Bas !');
      return this;
    },
    animate: function(){
      console.log('Ces Soirées Là !');
      return this;
    }
  }

  var MusiqueCommerciale = function(){};

  MusiqueCommerciale.prototype = superChoregraphie;

  return function(){
    return new MusiqueCommerciale();
  }
}());

window.$ = jSami;

//$().css().fadeTo().animate().fadeTo().animate();

/* Les tableaux */

var objetDeTypeTableau = [
  'mona lisa',
  'le cri',
  'la radeau de la méduse'
];

// équivalent à
/*var objetDeTypeTableau = new Array(
  'mona lisa',
  'le cri',
  'la radeau de la méduse'
);*/


// tableau a 3 propriétés 0,1,2
var premier = objetDeTypeTableau.pop();
// tableau a 2 propriétés 0,1
objetDeTypeTableau.push(premier);

'toto'.split('').reverse().join('') === 'toto'; // false
// ['t','o','t','o'] <= 'toto'.split('');
// ['o','t','o','t'] <= ['t','o','t','o'].reverse();
// 'otot' <= ['o','t','o','t'].join('');
// 'otot' === 'toto' // false

'kayak'.split('').reverse().join('') === 'kayak'; // true
// ['k','a','y','a','k'] <= 'kayak'.split('');
// ['k','a','y','a','k'] <= ['k','a','y','a','k'].reverse();
// 'kayak' <= ['k','a','y','a','k'].join('');
// 'kayak' === 'kayak' // true

/* Le prototypage */

// Mon Code
var parents = {
  ontUneBMW: true,
  direBonjour: function(){
    console.log('Ravi de faire votre connaissance !');
  }
};

var Enfant = function(){

}

Enfant.prototype = parents;

var charlesHenri = new Enfant();

charlesHenri.ontUneBMW; // true
// Mais est-ce que c'est vraiment la sienne ?!!!
charlesHenri.hasOwnProperty('ontUneBMW'); // false

// Ton Code
var EnfantDesEnfant = function(){
  this.ontUn4Elle = true;
}

EnfantDesEnfant.prototype = charlesHenri;

var charlesMichel = new EnfantDesEnfant();

/* Préchargement */
window.addEventListener('DOMContentLoaded', function(){
  console.log('DOM Chargé !');
  var objetImg = window.document.createElement('img');
  objetImg.alt = 'Chaton !';
  objetImg.src = 'https://images8.alphacoders.com/548/548760.jpg';
  objetImg.addEventListener('load', function(){
    /*console.log('Image chargée !');
    window.document.getElementById('loader').style.display = 'none';
    window.document.body.appendChild(objetImg);*/
  });
});


/* Canvas */
window.addEventListener('DOMContentLoaded', function(){
  var elementDeTypeCanvas = window.document.getElementById('monCanvas');

  var objetDeDessin2D = elementDeTypeCanvas.getContext('2d');
  // var objetDeDessin3D = elementDeTypeCanvas.getContext('webGl');
  objetDeDessin2D; // CanvasRenderingContext2D
  var x = 0;
  var y = 0;
  //window.setInterval(function(){
    objetDeDessin2D.clearRect(0,0, 1600, 1600);
    objetDeDessin2D.fillStyle = '#CC0000'; 
    objetDeDessin2D.fillRect(x, y, 300, 300);
    objetDeDessin2D.fillStyle = '#00CC00';
    objetDeDessin2D.fillRect(x + 40, y + 40, 300, 300);
    //
  //}, 10);

  window.addEventListener('keydown', function(evtClavier){
    console.log(evtClavier);
    switch (evtClavier.keyCode) {
      case 39:
        x ++;
        objetDeDessin2D.clearRect(0,0, 1600, 1600);
        objetDeDessin2D.fillStyle = '#CC0000'; 
        objetDeDessin2D.fillRect(x, y, 300, 300);
        objetDeDessin2D.fillStyle = '#00CC00';
        objetDeDessin2D.fillRect(x + 40, y + 40, 300, 300);
      break;
    }
  });

});

/* Closures */
var message = 'Bonjour !';

var maFonction = function(){
  var message = 'Au Revoir !';
  //console.log(message);

  var maFonctionDedans  = function(){
    console.log(message);
  }

  return maFonctionDedans;
};

var retour = maFonction();

retour(); // 'Au Revoir'

var spriteMegaman = {
  course:[{
    largeurDeMasque: '28px',
    hauteurDeMasque: '31px',
    leftImage: '-410px',
    topImage: '-75px',
  },{
    largeurDeMasque: '38px',
    hauteurDeMasque: '31px',
    leftImage: '-439px',
    topImage: '-75px',
  },{
    largeurDeMasque: '38px',
    hauteurDeMasque: '31px',
    leftImage: '-479px',
    topImage: '-75px',
  },{
    largeurDeMasque: '49px',
    hauteurDeMasque: '32px',
    leftImage: '-518px',
    topImage: '-75px',
  }]
};

var scaleX = 1;
window.addEventListener('click', function(){
  if (scaleX === 1) {
    scaleX = -1;
  } else {
    scaleX = 1
  }
})

window.addEventListener('DOMContentLoaded', function(){
  var eltMasque = window.document.getElementById('masque');
  var eltSprite = window.document.getElementById('sprite');
  var eltCentrage = window.document.getElementById('centrage');

  eltCentrage.style.width = '51px';
  eltCentrage.style.height = '34px';
  eltCentrage.style.position = 'absolute';
  eltCentrage.style.overflow = 'hidden';
  eltCentrage.style.top = '0px';
  eltCentrage.style.left = '0px';
  eltCentrage.style.border = '1px solid yellow';

  eltMasque.style.top = '0px';
  eltMasque.style.left = '0px';
  eltMasque.style.width = '0px';
  eltMasque.style.height = '0px';
  eltMasque.style.position = 'relative';
  eltMasque.style.overflow = 'hidden';
  eltMasque.style.margin = '0 auto';
  eltMasque.style.border = '1px solid blue';


  eltSprite.style.top = '0px';
  eltSprite.style.left = '0px';
  eltSprite.style.position = 'absolute';

  var x = 0;
  window.setInterval(function(){
    eltMasque.style.transform = `scaleX(${scaleX})`;
    if (x >= spriteMegaman.course.length) {
      x = 0;
    }
    eltMasque.style.width = spriteMegaman.course[x].largeurDeMasque;
    eltMasque.style.height = spriteMegaman.course[x].hauteurDeMasque;
    eltSprite.style.left = spriteMegaman.course[x].leftImage;
    eltSprite.style.top = spriteMegaman.course[x].topImage;
    x++;
  }, 250);
})

































