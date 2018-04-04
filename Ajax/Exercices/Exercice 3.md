# Exercice 3 - autocomplete

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

### Serveur
Reprenez le serveur express créé aux exercices précédents

Le serveur doit pouvoir renvoyer un fichier JSON en réponse à une adresse prévue, par exemple :
/extraits/mon-json2.json
Ce fichier doit être généré par le serveur à la volée.

Le serveur doit récupérer un paramètre passé avec la méthode GET dans la requête HTTP.

Le paramètre doit ensuite être utilisé dans une requête MongoDB pour retrouver les restaurants de New York dont le nom commence par la valeur texte passée en GET.

La liste de résultats doit être renvoyée au client au format JSON.

### Client

Le serveur doit générer une page contenant un formulaire permettant de saisir du texte.

Un script doit interrompre l'envoi du formulaire et gérer l'envoi des données via une requête Ajax.

Le script recevenant le résultat de la requête doit afficher une liste de noms de restaurants sous le formulaire.
