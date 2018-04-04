/**
  Des petits carrés... essentiellement gérés coté serveur.

  L'application affiche un petit carré coloré que je peux déplacer avec les mouvements de la souris.
  Si une autre personne démarre l'application, un petit carré coloré qu'elle peut déplacer s'affiche
  sur son écran. Le petit carré de la personne s'affiche également sur mon écran. Tous les déplacements
  qu'effectue l'autre personne sont répercutés par l'application sur mon écran et inversement.
**/

/**
  I. Coté client : On doit pouvoir afficher un petit carré coloré dont les caractéristiques proviennent du serveur et le déplacer. Au déplacement du petit carré coloré, le serveur en est informé.
  Vous utiliserez l'API de socket.io coté client documenté ici : http://socket.io/docs/client-api/

  2. Au chargement du document : 
    - vous devez établir une connexion WebSocket avec un serveur WebSocket;
    - Lorsque vous recevez les caractéristiques de votre petit carré (celui qui sera associé à votre connexion) et provenant du serveur WebSocket, vous devez le créer dans le corps du document HTML et lui attacher un gestionnaire d'évènement pour faire en sorte qu'il puisse se déplacer en suivant les mouvement de la souris. Lorsque vous déplacez la souris, vous devez envoyer les caractéristiques de votre petit carré au serveur WebSocket;
    - Lorsque vous recevez les caractéristiques d'un autre petit carré (qui n'est pas associé à votre connexion) provenant du serveur WebSocket, vous devez le créer dans le corps du document HTML si il n'existe pas (identifiant introuvable) ou le mettre à jour si il existe.
**/


/**
  II. Coté serveur : On doit pouvoir envoyer les caractéristiques d'un petit carré (identifiant, coordonnées, couleur) à un client qui vient de se connecter, recevoir les caractéristiques d'un petit carré et les envoyer à tous les autres clients connectés.
  Vous utiliserez l'API de socket.io coté serveur documenté ici : http://socket.io/docs/server-api/

  1. Vous devez créer un serveur HTTP qui vous permettra d'envoyer le document HTML contenant le script de création de carrés à des clients HTTP.

  2. Vous devez créer un serveur WebSocket qui :
  - à la connexion d'un client WebSocket, envoi les caractéristiques (identifiant, position, couleur) d'un carré uniquement à ce client WebSocket.
  - à la réception des caractéristiques d'un petit carré provenant d'un client WebSocket, envoi ces caractéristiques à tous les clients WebSocket connectés sauf l'émetteur initial.
  - trouvez un moyen de détecter si un client n'est plus connecté au serveur Websocket et dans ce cas envoyez un message enjoignant à tous les clients WebSocket encore connectés de supprimer le petit carré correspondant à ce client.
  
  Vous utiliserez, entre autres, la propriété .broadcast voir : http://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender-socket-io
**/