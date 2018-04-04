var boite = {
  width: 300,
  height: 150
};

var coordonnees = {
  [{
    x: 10,
    y: 20
  },
  {
    x: 260,
    y: 20
  },
  {
    x: 10,
    y: 80
  },
  {
    x: 260,
    y: 80
  }]
};

function compareInf (a,b) {
  if (a < b) {
    return a;
  }
  return b;
};
function compareMax (a,b) {
  if (a > b) {
    return a;
  }
  return b;
};

function balayage() {
  var valeurs = {
    minx: boite.width,
    maxx: 0,
    miny: boite.height,
    maxy: 0,
  }
  for (var i = 0; coordonnees[i]; i++) {
    valeurs.minx = compareInf(valeurs.minx,coordonnes[i][x]);
    valeurs.miny = compareInf(valeurs.miny,coordonnes[i][y]);
    valeurs.maxx = compareMax(valeurs.maxx,coordonnes[i][x]);
    valeurs.maxy = compareInf(valeurs.maxy,coordonnes[i][y]);
  }
  return valeurs;
}
