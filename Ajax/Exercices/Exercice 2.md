# Exercice 2 - JSON

## Présentation
La méthode ajax() http://api.jquery.com/jquery.ajax/ permet de mettre en oeuvre de façon simplifiée la technique de mise à jour asynchrone AJAX.

Cette méthode s'utilise de la façon suivante :


$.ajax({
  url: ' Où est-ce qu'on envoie la requête pour télécharger ? '
  method: ' Comment est envoyée la requête (GET ou POST) ? ',
  data: ' Qu'est-ce qu'on envoie comme données dans la requête HTTP ? (sous la forme variable=valeur&autrevariable=autrevaleur&etc... ) ',
  dataType: ' Quelle est la forme des données qu'on reçoit ? ('text', 'html', 'json') ',
  success: ' Qu'est ce qu'on fait quand on reçoit une réponse ? (il s'agit ici d'une fonction qui sera executée par jQuery à la réception des données) '
});


##  Objectif :

Reprenez le serveur express créé à l'exercice 1

Le serveur doit pouvoir renvoyer un fichier JSON en réponse à une adresse prévue, par exemple :
/extraits/mon-json.json
Ce fichier doit être généré par le serveur à la volée et contenir au moins 3 propritétés avec des valeurs de votre choix.

Faire en sorte que lorsqu'un utilisateur clique sur un bouton sur la page affichée, le JSON soit téléchargé.
Lorsque le contenu est obtenu côté client (navigateur) affichez la valeur de chaque propriété dans un paragraphe différent.
