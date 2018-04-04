/**
  Des petits carrés... essentiellement gérés coté client.

  L'application affiche un petit carré coloré que je peux déplacer avec les mouvements de la souris.
  Si une autre personne démarre l'application, un petit carré coloré qu'elle peut déplacer s'affiche
  sur son écran. Le petit carré de la personne s'affiche également sur mon écran. Tous les déplacements
  qu'effectue l'autre personne sont répercutés par l'application sur mon écran et inversement.
**/

/**
  I. Coté client : On doit pouvoir afficher un petit carré coloré et le déplacer. A la création d'un petit carré coloré, le serveur en est informé. Au déplacement du petit carré coloré, le serveur en est informé.
  Vous utiliserez l'API de socket.io coté client documenté ici : http://socket.io/docs/client-api/

  1. Vous devez créer un document HTML et dans l'entête penser à charger le script client de socket.io.

  2. Au chargement du document :
    - vous devez établir une connexion WebSocket avec un serveur WebSocket;
    - vous devez exécuter un script qui créé un petit carré coloré dans le corps du document. Ce petit carré coloré doit impérativement avoir un identifiant différent à chaque fois qu'on exécute le script (pensez à utiliser la méthode .random() de l'objet fondamental Math);
    - Lorsque le petit carré coloré est créé, vous devez envoyer, en utilisant socket.io, les caractéristiques du petit carré créé (identifiant, coordonnées et couleur) au serveur WebSocket.

  3. Ajoutez à votre script le code nécessaire pour que le petit carré puisse se déplacer en suivant les mouvements du curseur de la souris. A chaque fois que vous modifiez les coordonnées du petit carré, vous devez envoyer les caractéristiques du petit carré déplacé au serveur WebSocket (identifiant, nouvelles coordonnées et couleur).

  4. Si le serveur WebSocket vous envoi les caractéristiques d'un petit carré qui n'existe pas sur le document affiché (identifiant introuvable), vous devez créer un nouveau petit carré

  5. Si le serveur WebSocket vous envoi les caractéristiques d'un petit carré qui existe sur le document affiché (identifiant trouvé), vous devez mettre à jour les caractéristiques de ce petit carré.

  6. Faîtes en sorte que lorsque que vous créez un petit carré pour la première fois sur votre document HTML, sa couleur soit aléatoire.
**/


/**
  II. Coté serveur : On doit pouvoir recevoir les caractéristiques d'un petit carré (identifiant, coordonnées, couleur) provenant d'un client et les envoyer à tous les clients connectés.
  Vous utiliserez l'API de socket.io coté serveur documenté ici : http://socket.io/docs/server-api/

  1. Vous devez créer un serveur HTTP qui vous permettra d'envoyer le document HTML contenant le script de création de carrés à des clients HTTP.

  2. Vous devez créer un serveur WebSocket qui, à la réception des caractéristiques d'un petit carré provenant d'un client WebSocket, envoi ces caractéristiques à tous les clients WebSocket connectés sauf l'émetteur initial.
  
  Vous utiliserez la propriété .broadcast voir : http://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender-socket-io
**/