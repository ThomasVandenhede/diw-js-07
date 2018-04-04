# Exercice 1 - Texte

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

Créez un serveur express

Le serveur doit pouvoir renvoyer un fichier texte en réponse à une adresse prévue, par exemple :
/extraits/mon-texte.txt
Ce fichier texte doit contenir un court texte de votre choix.

Faire en sorte que lorsqu'un utilisateur clique sur un bouton sur la page affichée, le texte brut soit téléchargé et affiché sous le titre dans une zone prévue à cet effet.

