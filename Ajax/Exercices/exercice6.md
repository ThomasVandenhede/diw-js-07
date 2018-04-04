Nous avons utilisé jusqu'à maintenant jQuery pour réaliser des requêtes en asynchrone. Nous pouvons aussi recourir à Angular JS. Pour ce faire, il faut utiliser un controller qui utilisera le service $http (https://docs.angularjs.org/api/ng/service/$http) de la façon suivante :
  angular.module(<nom du module>).controller(<nom u controller>,['$http' ,function($http){
  …
    $http.get(<url>).then(function(reponse){
      //Réussite

    },function(reponse){
      //Erreur
    });
  };
  this.articles = [];
}]);



------ 1 ------
Reprenez le blog.

------ 2 ------
Affichez seulement un article sur la page d'accueil.

------ 3 ------
Prévoyez une balise avec un ng-controller ayant pour enfant une balise avec un ng-click. Chaque clique sur la balise permet d'afficher l'article suivant à la suite du bouton.

