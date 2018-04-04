(function () {
    var texte = 'Lorem ipsum';

    var maFonction = function(arg) {
        return [arg, arg + 1,  arg + 2];
    };

    var tableau = maFonction(8);
    for (var i = 0; tableau[i]; i++) {
        alert(tableau[i]);
    }

})();
